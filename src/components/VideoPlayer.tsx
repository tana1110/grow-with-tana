'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, CheckCircle2, PartyPopper, X } from 'lucide-react'

interface VideoPlayerProps {
  courseId: string
  lessonId: string
  videoPath: string
  title: string
  alreadyCompleted: boolean
  nextLessonId: string | null
  /** لتشغيل مقطع محدد من ملف طويل (بالثواني) — درس = جزء من الفيديو. */
  startTime?: number
  endTime?: number
}

const COUNTDOWN_SECONDS = 5

export default function VideoPlayer({
  courseId,
  lessonId,
  videoPath,
  title,
  alreadyCompleted,
  nextLessonId,
  startTime,
  endTime,
}: VideoPlayerProps) {
  const router = useRouter()
  // ?autoplay=1 يُضاف عند الانتقال التلقائي بعد العدّ التنازلي
  const shouldAutoplay = useSearchParams().get('autoplay') === '1'
  const videoRef = useRef<HTMLVideoElement>(null)
  const finishedRef = useRef(false)
  const [justCompleted, setJustCompleted] = useState(false)
  const [saving, setSaving] = useState(false)
  // null = لا يوجد عدّ تنازلي، رقم = الثواني المتبقية قبل الانتقال التلقائي
  const [countdown, setCountdown] = useState<number | null>(null)

  // العدّ التنازلي: كل ثانية ننقص واحدًا، وعند الصفر ننتقل للدرس التالي.
  useEffect(() => {
    if (countdown === null || !nextLessonId) return
    if (countdown <= 0) {
      router.push(`/learn/${courseId}/${nextLessonId}?autoplay=1`)
      return
    }
    const timer = setTimeout(() => setCountdown((current) => (current ?? 1) - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, nextLessonId, courseId, router])

  // حفظ التقدّم وفتح الدرس التالي فورًا.
  async function markCompleted() {
    if (justCompleted || saving) return
    if (alreadyCompleted) {
      // درس مُعاد مشاهدته: انتقل مباشرة بالعدّ التنازلي بدون حفظ جديد
      if (nextLessonId && countdown === null) setCountdown(COUNTDOWN_SECONDS)
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, lessonId }),
      })
      if (res.ok) {
        setJustCompleted(true)
        if (nextLessonId) setCountdown(COUNTDOWN_SECONDS)
        router.refresh() // يعيد رسم القائمة الجانبية بالدرس المفتوح حديثًا
      }
    } finally {
      setSaving(false)
    }
  }

  // القفز إلى بداية مقطع الدرس وتشغيله فورًا عند فتح الصفحة.
  function handleLoadedMetadata() {
    const video = videoRef.current
    if (!video) return
    if (startTime) video.currentTime = startTime
    // التشغيل الفوري بعد العدّ التنازلي — بعض المتصفحات قد تمنعه قبل أول تفاعل
    if (shouldAutoplay) video.play().catch(() => {})
  }

  // إيقاف التشغيل عند نهاية مقطع الدرس واعتباره مكتملًا.
  function handleTimeUpdate() {
    const video = videoRef.current
    if (!video || endTime == null) return
    if (video.currentTime >= endTime && !finishedRef.current) {
      finishedRef.current = true
      video.pause()
      markCompleted()
    }
    // السماح بإعادة المشاهدة بعد الرجوع للخلف
    if (video.currentTime < endTime - 1 && finishedRef.current) {
      finishedRef.current = false
    }
  }

  const showCelebration = justCompleted || (alreadyCompleted && countdown !== null)

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-xl shadow-slate-300/40 ring-1 ring-slate-200">
        <video
          key={lessonId}
          ref={videoRef}
          autoPlay={shouldAutoplay}
          controls
          controlsList="nodownload"
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={markCompleted}
          className="aspect-video w-full bg-black"
        >
          <source src={`${videoPath}${startTime ? `#t=${startTime}` : ''}`} type="video/mp4" />
          متصفحك لا يدعم تشغيل الفيديو.
        </video>

        {/* غطاء العدّ التنازلي للانتقال التلقائي */}
        {countdown !== null && nextLessonId && (
          <div className="animate-pop absolute inset-0 flex flex-col items-center justify-center gap-4 bg-navy/85 text-white backdrop-blur-sm">
            <p className="text-lg font-extrabold">أحسنت! 🎉 الدرس التالي يبدأ خلال</p>
            <div
              key={countdown}
              className="animate-pop flex h-24 w-24 items-center justify-center rounded-full bg-coral text-5xl font-extrabold shadow-lg shadow-coral/40"
            >
              {countdown}
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/learn/${courseId}/${nextLessonId}?autoplay=1`}
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-extrabold text-navy transition hover:bg-slate-100"
              >
                انتقل الآن
              </Link>
              <button
                onClick={() => setCountdown(null)}
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-white/30 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
                البقاء هنا
              </button>
            </div>
          </div>
        )}
      </div>

      {showCelebration && countdown === null && (
        <div className="animate-pop mt-4 flex flex-col items-start justify-between gap-3 rounded-3xl border border-leaf/30 bg-leaf/10 px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <PartyPopper className="animate-bounce-party h-6 w-6 shrink-0 text-leaf-dark" />
            <div>
              <p className="font-bold text-navy">أحسنت! أكملت هذا الدرس 🎉</p>
              <p className="text-sm text-leaf-dark">
                {nextLessonId
                  ? 'تم فتح الدرس التالي — واصل التقدّم!'
                  : 'مبروك! أنهيت الدورة كاملة.'}
              </p>
            </div>
          </div>
          {nextLessonId && (
            <Link
              href={`/learn/${courseId}/${nextLessonId}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-coral px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-coral-dark"
            >
              الدرس التالي
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}

      {alreadyCompleted && !showCelebration && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-leaf/30 bg-leaf/10 px-5 py-3 text-sm font-semibold text-leaf-dark">
          <CheckCircle2 className="h-4 w-4" />
          أكملت درس «{title}» — يمكنك إعادة مشاهدته في أي وقت.
        </div>
      )}
    </div>
  )
}
