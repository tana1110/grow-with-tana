import Link from 'next/link'
import { Clock, ChevronLeft } from 'lucide-react'
import type { Course, CourseColor } from '@/data/coursesData'

interface CourseCardProps {
  course: Course
  /** نسبة التقدّم (تظهر فقط للمستخدم المسجّل الذي بدأ الدورة). */
  percent?: number
  /** تأخير حركة الظهور (للتتابع في الشبكة). */
  delayClass?: string
}

const colorStyles: Record<CourseColor, { cover: string; chip: string }> = {
  coral: { cover: 'bg-coral', chip: 'bg-coral/10 text-coral-dark' },
  periwinkle: { cover: 'bg-periwinkle', chip: 'bg-periwinkle/10 text-periwinkle-dark' },
  grape: { cover: 'bg-grape', chip: 'bg-grape/10 text-grape' },
  leaf: { cover: 'bg-leaf', chip: 'bg-leaf/10 text-leaf-dark' },
  navy: { cover: 'bg-navy', chip: 'bg-navy/10 text-navy' },
}

export default function CourseCard({ course, percent, delayClass = '' }: CourseCardProps) {
  const colors = colorStyles[course.color]

  return (
    <Link
      href={`/courses/${course.id}`}
      className={`group flex flex-col rounded-3xl border-2 border-transparent bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:rotate-[0.5deg] hover:border-navy/10 hover:shadow-xl animate-fade-up ${delayClass}`}
    >
      {/* غلاف الدورة — بطاقة ملوّنة بدوائر زخرفية مثل تطبيقات الأطفال */}
      <div
        className={`relative flex h-36 items-center justify-center overflow-hidden rounded-t-3xl ${colors.cover}`}
      >
        <span className="pointer-events-none absolute -top-6 -start-6 h-24 w-24 rounded-full bg-white/15 transition group-hover:scale-125" />
        <span className="pointer-events-none absolute -bottom-8 end-6 h-20 w-20 rounded-full bg-black/10 transition group-hover:scale-110" />
        <span className="pointer-events-none absolute top-4 end-10 h-3 w-3 rounded-full bg-white/40" />
        <span className="text-6xl drop-shadow-md transition duration-300 group-hover:scale-125 group-hover:-rotate-6">
          {course.emoji}
        </span>
        <span className="absolute top-3 start-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-extrabold text-navy">
          {course.level}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span
          className={`mb-2 self-start rounded-full px-2.5 py-0.5 text-xs font-extrabold ${colors.chip}`}
        >
          {course.category}
        </span>
        <h3 className="mb-2 text-lg leading-snug font-extrabold text-navy">{course.title}</h3>
        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {course.description}
        </p>

        {typeof percent === 'number' && percent > 0 && (
          <div className="mb-3">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">تقدّمك</span>
              <span className="font-extrabold text-leaf-dark">{percent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="progress-shimmer h-full rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
          <span className="flex items-center gap-1.5 font-semibold text-slate-500">
            <Clock className="h-4 w-4" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1 font-extrabold text-coral">
            {percent && percent > 0 ? 'أكمل التعلّم' : 'ابدأ الآن'}
            <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}
