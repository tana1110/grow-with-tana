'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CheckCircle2, Lock, PlayCircle, Circle } from 'lucide-react'
import type { LessonStatus } from '@/lib/progress'

export interface SidebarLesson {
  id: string
  title: string
  status: LessonStatus
  unit?: string
}

interface SidebarProps {
  courseId: string
  courseTitle: string
  lessons: SidebarLesson[]
  completedCount: number
}

export default function Sidebar({ courseId, courseTitle, lessons, completedCount }: SidebarProps) {
  const params = useParams<{ lessonId?: string }>()
  const activeId = params.lessonId
  const percent = Math.round((completedCount / lessons.length) * 100)

  return (
    <nav className="flex h-full flex-col">
      {/* ملخّص التقدّم */}
      <div className="border-b border-slate-200 px-5 py-4">
        <Link
          href={`/courses/${courseId}`}
          className="mb-3 block text-sm font-bold text-slate-800 hover:text-leaf-dark"
        >
          {courseTitle}
        </Link>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-600">تقدّمك في الدورة</span>
          <span className="font-bold text-leaf-dark">{percent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full progress-shimmer transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          أكملت {completedCount} من {lessons.length} دروس
        </p>
      </div>

      {/* قائمة الدروس */}
      <ul className="sidebar-scroll flex-1 space-y-1 overflow-y-auto p-3">
        {lessons.map((lesson, index) => {
          const isActive = lesson.id === activeId
          const isLocked = lesson.status === 'locked'

          const inner = (
            <div
              className={`flex items-start gap-3 rounded-xl px-3 py-3 transition ${
                isActive
                  ? 'bg-leaf/10 ring-1 ring-leaf/30'
                  : isLocked
                    ? 'opacity-60'
                    : 'hover:bg-slate-50'
              }`}
            >
              <span className="mt-0.5 shrink-0">
                {lesson.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-leaf" />
                ) : isLocked ? (
                  <Lock className="h-5 w-5 text-slate-400" />
                ) : isActive ? (
                  <PlayCircle className="h-5 w-5 text-leaf-dark" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300" />
                )}
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-wide text-slate-400">
                  الدرس {index + 1}
                </span>
                <span
                  className={`block text-sm leading-snug font-semibold ${
                    isActive ? 'text-leaf-dark' : 'text-slate-700'
                  }`}
                >
                  {lesson.title}
                </span>
                {lesson.status === 'unlocked' && !isActive && (
                  <span className="mt-0.5 block text-xs text-leaf-dark">قيد التقدّم</span>
                )}
              </span>
            </div>
          )

          const showUnitHeader = lesson.unit && lesson.unit !== lessons[index - 1]?.unit

          return (
            <li key={lesson.id}>
              {showUnitHeader && (
                <p className="mt-3 mb-1 px-3 text-xs font-extrabold tracking-wide text-navy/50 first:mt-1">
                  {lesson.unit}
                </p>
              )}
              {isLocked ? (
                <div className="cursor-not-allowed" title="أكمل الدرس السابق لفتح هذا الدرس">
                  {inner}
                </div>
              ) : (
                <Link href={`/learn/${courseId}/${lesson.id}`}>{inner}</Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
