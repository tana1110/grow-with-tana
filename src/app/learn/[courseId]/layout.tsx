import { notFound, redirect } from 'next/navigation'
import { getCourseById } from '@/data/coursesData'
import { getSession } from '@/lib/auth'
import { getCompletedLessonIds, getLessonStatuses } from '@/lib/progress'
import LearnShell from '@/components/LearnShell'

interface LearnLayoutProps {
  children: React.ReactNode
  params: Promise<{ courseId: string }>
}

export default async function LearnLayout({ children, params }: LearnLayoutProps) {
  const { courseId } = await params
  const course = getCourseById(courseId)
  if (!course) notFound()

  const session = await getSession()
  if (!session) redirect('/login')

  const completedIds = await getCompletedLessonIds(session.userId, course.id)
  const statuses = getLessonStatuses(course, completedIds)

  const sidebarLessons = course.lessons.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    status: statuses[lesson.id],
    unit: lesson.unit,
  }))

  return (
    <LearnShell
      userName={session.name}
      courseId={course.id}
      courseTitle={course.title}
      lessons={sidebarLessons}
      completedCount={completedIds.size}
    >
      {children}
    </LearnShell>
  )
}
