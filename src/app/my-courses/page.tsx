import Link from 'next/link'
import { redirect } from 'next/navigation'
import { GraduationCap, ArrowLeft } from 'lucide-react'
import { courses } from '@/data/coursesData'
import { getSession } from '@/lib/auth'
import { getAllCourseProgress } from '@/lib/progress'
import Navbar from '@/components/Navbar'
import CourseCard from '@/components/CourseCard'

export const metadata = { title: 'دوراتي' }

export default async function MyCoursesPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const progress = await getAllCourseProgress(session.userId)
  const percentByCourse = new Map(progress.map((p) => [p.courseId, p.percent]))
  const started = courses.filter((c) => (percentByCourse.get(c.id) ?? 0) > 0)
  const notStarted = courses.filter((c) => (percentByCourse.get(c.id) ?? 0) === 0)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-extrabold text-navy">أهلًا {session.name} 👋</h1>
        <p className="mt-2 mb-10 text-slate-500">تابع من حيث توقفت، أو ابدأ دورة جديدة</p>

        {started.length > 0 ? (
          <section className="mb-12">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-navy">
              <GraduationCap className="h-5 w-5 text-coral" />
              دوراتك الحالية
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {started.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  percent={percentByCourse.get(course.id)}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="mb-12 rounded-2xl border border-dashed border-leaf/40 bg-leaf/5 p-10 text-center">
            <GraduationCap className="mx-auto mb-3 h-10 w-10 text-leaf" />
            <p className="font-bold text-slate-800">لم تبدأ أي دورة بعد</p>
            <p className="mt-1 mb-4 text-sm text-slate-600">
              اختر دورة من الأسفل وابدأ رحلتك التعليمية اليوم
            </p>
          </div>
        )}

        {notStarted.length > 0 && (
          <section>
            <h2 className="mb-5 flex items-center justify-between text-xl font-bold text-navy">
              اكتشف دورات جديدة
              <Link
                href="/courses"
                className="flex items-center gap-1 text-sm font-semibold text-coral hover:text-coral-dark"
              >
                عرض الكل
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {notStarted.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
