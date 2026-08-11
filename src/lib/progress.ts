import { prisma } from '@/lib/prisma'
import { courses, getCourseById, type Course } from '@/data/coursesData'

export type LessonStatus = 'completed' | 'unlocked' | 'locked'

/** معرّفات الدروس المكتملة داخل دورة واحدة. */
export async function getCompletedLessonIds(
  userId: string,
  courseId: string,
): Promise<Set<string>> {
  const rows = await prisma.lessonProgress.findMany({
    where: { userId, courseId },
    select: { lessonId: true },
  })
  return new Set(rows.map((row) => row.lessonId))
}

/**
 * الدرس الأول مفتوح دائمًا، والدرس N يُفتح فقط بعد إكمال الدرس N-1.
 */
export function getLessonStatuses(
  course: Course,
  completedIds: Set<string>,
): Record<string, LessonStatus> {
  const statuses: Record<string, LessonStatus> = {}
  course.lessons.forEach((lesson, index) => {
    if (completedIds.has(lesson.id)) {
      statuses[lesson.id] = 'completed'
    } else if (index === 0 || completedIds.has(course.lessons[index - 1].id)) {
      statuses[lesson.id] = 'unlocked'
    } else {
      statuses[lesson.id] = 'locked'
    }
  })
  return statuses
}

/** أول درس مفتوح وغير مكتمل (أو آخر درس إذا اكتملت الدورة). */
export function getCurrentLessonId(
  course: Course,
  statuses: Record<string, LessonStatus>,
): string {
  const next = course.lessons.find((lesson) => statuses[lesson.id] === 'unlocked')
  return next ? next.id : course.lessons[course.lessons.length - 1].id
}

export interface CourseProgressSummary {
  courseId: string
  completedCount: number
  totalCount: number
  percent: number
}

/** ملخّص تقدّم المستخدم في كل الدورات (للوحة "دوراتي"). */
export async function getAllCourseProgress(userId: string): Promise<CourseProgressSummary[]> {
  const rows = await prisma.lessonProgress.findMany({
    where: { userId },
    select: { courseId: true, lessonId: true },
  })
  const byCourse = new Map<string, Set<string>>()
  for (const row of rows) {
    if (!byCourse.has(row.courseId)) byCourse.set(row.courseId, new Set())
    byCourse.get(row.courseId)!.add(row.lessonId)
  }
  return courses.map((course) => {
    const completed = byCourse.get(course.id)?.size ?? 0
    return {
      courseId: course.id,
      completedCount: completed,
      totalCount: course.lessons.length,
      percent: Math.round((completed / course.lessons.length) * 100),
    }
  })
}

export function isValidCourse(courseId: string): boolean {
  return Boolean(getCourseById(courseId))
}
