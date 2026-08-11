import Link from 'next/link'
import { ArrowLeft, PlayCircle, CheckCircle2, Lock } from 'lucide-react'
import { courses, PLATFORM_NAME, PLATFORM_DESCRIPTION } from '@/data/coursesData'
import Navbar from '@/components/Navbar'
import CourseCard from '@/components/CourseCard'
import { LogoMark } from '@/components/Logo'

const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5']

const deckColors: Record<string, string> = {
  coral: 'bg-coral',
  periwinkle: 'bg-periwinkle',
  grape: 'bg-grape',
  leaf: 'bg-leaf',
  navy: 'bg-navy',
}

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      {/* الواجهة: نص يمين، مجموعة بطاقات مروَّحة يسار */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-20 lg:grid-cols-2 lg:gap-6">
        <div className="animate-fade-up">
          <h1 className="text-4xl leading-[1.2] font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            هنا تكبر
            <span className="relative mx-3 inline-block text-leaf">
              المهارات
              <svg
                viewBox="0 0 120 12"
                className="absolute -bottom-1 start-0 w-full text-sunny"
                aria-hidden="true"
              >
                <path
                  d="M3 9 Q 30 2, 60 7 T 117 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
            {PLATFORM_DESCRIPTION}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-coral px-7 py-3.5 text-base font-extrabold text-white shadow-lg shadow-coral/25 transition duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
            >
              ابدأ مجانًا
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/courses"
              className="text-base font-extrabold text-navy underline decoration-sunny decoration-4 underline-offset-8 transition hover:decoration-coral"
            >
              شاهد الدورات
            </Link>
          </div>
          <p className="mt-6 text-sm font-semibold text-slate-400">
            مجاني بالكامل · لا حاجة لبطاقة دفع
          </p>
        </div>

        {/* مروحة بطاقات من دورات حقيقية */}
        <div className="relative mx-auto h-64 w-full max-w-xs sm:h-80 sm:max-w-sm lg:h-105 lg:max-w-md" aria-hidden="true">
          {courses.slice(0, 3).map((course, index) => {
            // البطاقة الأولى في المنتصف — تبدو جيدة سواء كانت دورة واحدة أو أكثر
            const positions = [
              'top-4 start-1/2 -translate-x-1/2 rotate-2 animate-float z-10',
              'top-16 start-0 -rotate-6 animate-float-slow',
              'top-24 end-0 rotate-6 animate-float-delay',
            ]
            return (
              <div
                key={course.id}
                className={`absolute w-44 rounded-3xl bg-white p-3 shadow-xl shadow-navy/10 sm:w-52 ${positions[index]}`}
              >
                <div
                  className={`relative flex h-24 items-center justify-center overflow-hidden rounded-2xl sm:h-28 ${deckColors[course.color]}`}
                >
                  <span className="pointer-events-none absolute -top-4 -start-4 h-14 w-14 rounded-full bg-white/15" />
                  <span className="text-4xl drop-shadow">{course.emoji}</span>
                </div>
                <p className="mt-3 px-1 text-sm leading-snug font-extrabold text-navy">
                  {course.title}
                </p>
                <div className="mt-2 mb-1 flex items-center gap-1.5 px-1">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <span
                      className="progress-shimmer block h-full rounded-full"
                      style={{ width: `${[70, 40, 20][index]}%` }}
                    />
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {[70, 40, 20][index]}%
                  </span>
                </div>
              </div>
            )
          })}
          {/* الشعار يطلّ من خلف البطاقات */}
          <LogoMark className="absolute bottom-0 start-1/2 h-12 w-12 -translate-x-1/2 rotate-6 drop-shadow-lg sm:h-16 sm:w-16" />
        </div>
      </section>

      {/* كيف تعمل — شريط أفقي بسيط بدل بطاقات المميزات */}
      <section className="border-y-2 border-navy/5 bg-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-8 sm:grid-cols-3 sm:gap-8 sm:px-6 sm:py-10">
          {[
            { icon: PlayCircle, color: 'text-periwinkle', text: 'اختر دورة وشاهد الدرس الأول' },
            { icon: CheckCircle2, color: 'text-leaf', text: 'أنهِ الفيديو ليُحفظ تقدّمك تلقائيًا' },
            { icon: Lock, color: 'text-coral', text: 'يُفتح الدرس التالي فورًا — درسًا بعد درس' },
          ].map((step, index) => (
            <div key={index} className={`animate-fade-up ${delays[index]} flex items-center gap-4`}>
              <span className="text-4xl font-extrabold text-navy/10">{index + 1}</span>
              <step.icon className={`h-6 w-6 shrink-0 ${step.color}`} />
              <p className="text-sm leading-snug font-bold text-navy">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* الدورات */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">الدورات</h2>
          <Link
            href="/courses"
            className="flex items-center gap-1 text-sm font-extrabold text-coral hover:text-coral-dark"
          >
            عرض الكل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} delayClass={delays[index] ?? ''} />
          ))}
        </div>
      </section>

      {/* التذييل */}
      <footer className="border-t-2 border-navy/5 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm font-semibold text-slate-500 sm:flex-row">
          <span className="flex items-center gap-2">
            <LogoMark className="h-6 w-6" />
            {PLATFORM_NAME}
          </span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  )
}
