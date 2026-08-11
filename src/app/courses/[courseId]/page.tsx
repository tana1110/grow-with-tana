import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  PlayCircle,
  CheckCircle2,
  Lock,
  Clock,
  BarChart3,
  BookOpen,
  ArrowLeft,
} from 'lucide-react'
import { courses, getCourseById, type CourseColor } from '@/data/coursesData'
import { getSession } from '@/lib/auth'
import { getCompletedLessonIds, getLessonStatuses, getCurrentLessonId } from '@/lib/progress'
import Navbar from '@/components/Navbar'

interface CoursePageProps {
  params: Promise<{ courseId: string }>
}

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }))
}

const headerColors: Record<CourseColor, string> = {
  coral: 'bg-coral',
  periwinkle: 'bg-periwinkle',
  grape: 'bg-grape',
  leaf: 'bg-leaf',
  navy: 'bg-navy',
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { courseId } = await params
  const course = getCourseById(courseId)
  if (!course) notFound()

  const session = await getSession()
  const completedIds = session
    ? await getCompletedLessonIds(session.userId, course.id)
    : new Set<string>()
  const statuses = getLessonStatuses(course, completedIds)
  const percent = Math.round((completedIds.size / course.lessons.length) * 100)
  const continueLessonId = getCurrentLessonId(course, statuses)

  const ctaHref = session
    ? `/learn/${course.id}/${continueLessonId}`
    : `/signup?from=/courses/${course.id}`
  const ctaLabel = !session
    ? 'سجّل وابدأ الدورة مجانًا'
    : completedIds.size === 0
      ? 'ابدأ الدورة'
      : percent === 100
        ? 'راجع الدورة'
        : 'أكمل التعلّم'

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ترويسة الدورة بلون بطاقتها + أشكال متحركة */}
      <section className={`relative overflow-hidden text-white ${headerColors[course.color]}`}>
        <span className="animate-float pointer-events-none absolute -top-10 end-10 h-40 w-40 rounded-full bg-white/10" />
        <span className="animate-float-slow pointer-events-none absolute bottom-0 start-1/4 h-24 w-24 rounded-full bg-black/10" />
        <span className="animate-float-delay pointer-events-none absolute top-10 start-10 h-6 w-6 rounded-full bg-white/30" />

        <div className="relative mx-auto max-w-6xl px-6 py-12">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm font-semibold">
            <Link href="/courses" className="text-white/70 hover:text-white">
              الدورات
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white/90">{course.category}</span>
          </div>
          <div className="animate-fade-up flex items-start gap-4">
            <span className="animate-wiggle hidden text-6xl drop-shadow-lg sm:block">
              {course.emoji}
            </span>
            <div>
              <h1 className="max-w-3xl text-3xl leading-tight font-extrabold sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/85">{course.description}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-bold text-white/90">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" /> {course.lessons.length} دروس
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" /> المستوى: {course.level}
            </span>
          </div>
          <div className="animate-fade-up delay-2 mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-base font-extrabold text-navy shadow-lg transition duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              <PlayCircle className="h-5 w-5 text-coral" />
              {ctaLabel}
            </Link>
            {session && completedIds.size > 0 && (
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold">
                أكملت {percent}% من الدورة
              </span>
            )}
          </div>
        </div>
      </section>

      {/* محتوى الدورة */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-extrabold text-navy">محتوى الدورة</h2>
        <ol className="space-y-3">
          {course.lessons.map((lesson, index) => {
            const status = statuses[lesson.id]
            const locked = status === 'locked' || !session
            const unlockedIcon =
              status === 'completed' ? (
                <CheckCircle2 className="h-6 w-6 text-leaf" />
              ) : (
                <PlayCircle className="h-6 w-6 text-coral" />
              )
            const row = (
              <div
                className={`animate-fade-up flex items-start gap-4 rounded-3xl border-2 bg-white p-5 shadow-sm transition duration-300 ${
                  locked
                    ? 'border-transparent opacity-70'
                    : 'border-transparent hover:-translate-y-0.5 hover:border-leaf/30 hover:shadow-md'
                }`}
              >
                <span className="mt-0.5 shrink-0">
                  {!session ? (
                    index === 0 ? (
                      <PlayCircle className="h-6 w-6 text-coral" />
                    ) : (
                      <Lock className="h-6 w-6 text-slate-300" />
                    )
                  ) : status === 'locked' ? (
                    <Lock className="h-6 w-6 text-slate-300" />
                  ) : (
                    unlockedIcon
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold tracking-wide text-slate-400">
                    الدرس {index + 1}
                  </p>
                  <h3 className="mt-0.5 font-extrabold text-navy">{lesson.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {lesson.description}
                  </p>
                </div>
                {!locked && <ArrowLeft className="mt-1 h-5 w-5 shrink-0 text-coral" />}
              </div>
            )
            const showUnitHeader =
              lesson.unit && lesson.unit !== course.lessons[index - 1]?.unit
            return (
              <li key={lesson.id}>
                {showUnitHeader && (
                  <h3 className="mt-6 mb-3 text-sm font-extrabold tracking-wide text-navy/60 first:mt-0">
                    {lesson.unit}
                  </h3>
                )}
                {locked ? (
                  <div title={session ? 'أكمل الدرس السابق لفتح هذا الدرس' : 'سجّل الدخول للبدء'}>
                    {row}
                  </div>
                ) : (
                  <Link href={`/learn/${course.id}/${lesson.id}`}>{row}</Link>
                )}
              </li>
            )
          })}
        </ol>
      </section>
    </main>
  )
}
