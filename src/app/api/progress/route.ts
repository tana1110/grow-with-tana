import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { getCourseById, getLessonIndex } from '@/data/coursesData'
import { getCompletedLessonIds } from '@/lib/progress'

export async function GET(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'غير مسجّل الدخول.' }, { status: 401 })
  }
  const courseId = new URL(request.url).searchParams.get('courseId')
  const rows = await prisma.lessonProgress.findMany({
    where: { userId: session.userId, ...(courseId ? { courseId } : {}) },
    select: { courseId: true, lessonId: true },
  })
  return NextResponse.json({ completed: rows })
}

/** تسجيل إكمال درس (يُستدعى عند انتهاء الفيديو عبر حدث onEnded). */
export async function POST(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'غير مسجّل الدخول.' }, { status: 401 })
  }

  const { courseId, lessonId } = await request.json()
  const course = getCourseById(courseId)
  const index = course ? getLessonIndex(courseId, lessonId) : -1
  if (!course || index === -1) {
    return NextResponse.json({ error: 'درس غير معروف.' }, { status: 400 })
  }

  // لا يمكن إكمال درس إلا إذا كان مفتوحًا فعلًا لهذا المستخدم.
  const completed = await getCompletedLessonIds(session.userId, courseId)
  if (index > 0 && !completed.has(course.lessons[index - 1].id)) {
    return NextResponse.json({ error: 'هذا الدرس مقفل.' }, { status: 403 })
  }

  await prisma.lessonProgress.upsert({
    where: {
      userId_courseId_lessonId: { userId: session.userId, courseId, lessonId },
    },
    update: {},
    create: { userId: session.userId, courseId, lessonId },
  })

  const nextLesson = course.lessons[index + 1] ?? null
  return NextResponse.json({ ok: true, unlockedLessonId: nextLesson?.id ?? null })
}
