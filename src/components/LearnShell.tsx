'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar, { type SidebarLesson } from '@/components/Sidebar'
import LogoutButton from '@/components/LogoutButton'
import Logo from '@/components/Logo'

interface LearnShellProps {
  userName: string
  courseId: string
  courseTitle: string
  lessons: SidebarLesson[]
  completedCount: number
  children: React.ReactNode
}

export default function LearnShell({
  userName,
  courseId,
  courseTitle,
  lessons,
  completedCount,
  children,
}: LearnShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* الشريط العلوي */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b-2 border-navy/5 bg-white/90 px-4 backdrop-blur sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen((open) => !open)}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="قائمة الدروس"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-slate-500 sm:inline">أهلًا، {userName}</span>
          <LogoutButton />
        </div>
      </header>

      <div className="flex flex-1">
        {/* القائمة الجانبية — درج منزلق على الجوال، عمود ثابت على الشاشات الكبيرة */}
        <aside
          className={`fixed inset-y-0 end-0 top-16 z-20 w-80 max-w-[85vw] transform border-s border-slate-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 lg:border-s-0 lg:border-e ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
        >
          <div onClick={() => setSidebarOpen(false)} className="h-full">
            <Sidebar
              courseId={courseId}
              courseTitle={courseTitle}
              lessons={lessons}
              completedCount={completedCount}
            />
          </div>
        </aside>

        {/* خلفية معتمة للدرج على الجوال */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-16 z-10 bg-slate-900/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  )
}
