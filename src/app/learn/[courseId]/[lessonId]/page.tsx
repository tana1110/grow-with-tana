import { notFound, redirect } from 'next/navigation'
import { courses, getCourseById } from '@/data/coursesData'
import { getSession } from '@/lib/auth'
import { getCompletedLessonIds, getLessonStatuses } from '@/lib/progress'
import VideoPlayer from '@/components/VideoPlayer'
import LessonTabs from '@/components/LessonTabs'

interface LessonPageProps {
  params: Promise<{ courseId: string; lessonId: string }>
}

export function generateStaticParams() {
  return courses.flatMap((course) =>
    course.lessons.map((lesson) => ({ courseId: course.id, lessonId: lesson.id })),
  )
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params
  const course = getCourseById(courseId)
  const lessonIndex = course?.lessons.findIndex((lesson) => lesson.id === lessonId) ?? -1
  if (!course || lessonIndex === -1) notFound()
  const lesson = course.lessons[lessonIndex]

  const session = await getSession()
  if (!session) redirect('/login')

  const completedIds = await getCompletedLessonIds(session.userId, course.id)
  const statuses = getLessonStatuses(course, completedIds)

  // لا يمكن فتح درس مقفل بكتابة رابطه مباشرة.
  if (statuses[lesson.id] === 'locked') redirect(`/learn/${course.id}`)

  const nextLesson = course.lessons[lessonIndex + 1] ?? null

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-5">
        <p className="text-xs font-bold tracking-wide text-leaf-dark">
          {lesson.unit ? `${lesson.unit} • ` : ''}الدرس {lessonIndex + 1} من{' '}
          {course.lessons.length} • {course.title}
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
          {lesson.title}
        </h1>
      </div>

      <VideoPlayer
        courseId={course.id}
        lessonId={lesson.id}
        videoPath={lesson.videoPath}
        startTime={lesson.startTime}
        endTime={lesson.endTime}
        title={lesson.title}
        alreadyCompleted={completedIds.has(lesson.id)}
        nextLessonId={nextLesson?.id ?? null}
      />

      <div className="mt-6">
        <LessonTabs description={lesson.description} resources={lesson.resources} />
      </div>
    </div>
  )
}
