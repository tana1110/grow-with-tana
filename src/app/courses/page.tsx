import { courses } from '@/data/coursesData'
import { getSession } from '@/lib/auth'
import { getAllCourseProgress } from '@/lib/progress'
import Navbar from '@/components/Navbar'
import CourseCard from '@/components/CourseCard'

export const metadata = { title: 'الدورات' }

export default async function CoursesPage() {
  const session = await getSession()
  const progress = session ? await getAllCourseProgress(session.userId) : []
  const percentByCourse = new Map(progress.map((p) => [p.courseId, p.percent]))

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="animate-fade-up text-3xl font-extrabold text-navy">جميع الدورات</h1>
        <p className="mt-2 mb-8 font-semibold text-slate-500">
          {courses.length} دورات متاحة — تُضاف دورات جديدة باستمرار
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              percent={percentByCourse.get(course.id)}
              delayClass={`delay-${Math.min(index + 1, 5)}`}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
