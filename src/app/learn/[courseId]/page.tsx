import { notFound, redirect } from 'next/navigation'
import { getCourseById } from '@/data/coursesData'
import { getSession } from '@/lib/auth'
import { getCompletedLessonIds, getLessonStatuses, getCurrentLessonId } from '@/lib/progress'

/** ‎/learn/[courseId] يحوّل إلى الدرس الذي يجب أن يتابعه المستخدم. */
export default async function LearnIndexPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const course = getCourseById(courseId)
  if (!course) notFound()

  const session = await getSession()
  if (!session) redirect('/login')

  const completedIds = await getCompletedLessonIds(session.userId, course.id)
  const statuses = getLessonStatuses(course, completedIds)
  redirect(`/learn/${course.id}/${getCurrentLessonId(course, statuses)}`)
}
