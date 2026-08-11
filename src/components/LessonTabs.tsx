'use client'

import { useState } from 'react'
import { BookOpen, ExternalLink, LinkIcon } from 'lucide-react'
import type { LessonResource } from '@/data/coursesData'

interface LessonTabsProps {
  description: string
  resources: LessonResource[]
}

export default function LessonTabs({ description, resources }: LessonTabsProps) {
  const [tab, setTab] = useState<'overview' | 'resources'>('overview')

  return (
    <div className="animate-fade-up rounded-3xl border-2 border-navy/5 bg-white shadow-sm">
      {/* شريط التبويبات */}
      <div className="flex flex-wrap gap-1 border-b border-slate-200 px-3 pt-3">
        <button
          onClick={() => setTab('overview')}
          className={`inline-flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-semibold transition ${
            tab === 'overview'
              ? 'border-b-2 border-coral text-coral-dark'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          نظرة عامة
        </button>
        <button
          onClick={() => setTab('resources')}
          className={`inline-flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-semibold transition ${
            tab === 'resources'
              ? 'border-b-2 border-coral text-coral-dark'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <LinkIcon className="h-4 w-4" />
          المصادر والأدوات
          {resources.length > 0 && (
            <span className="rounded-full bg-coral/10 px-2 py-0.5 text-xs font-bold text-coral-dark">
              {resources.length}
            </span>
          )}
        </button>
      </div>

      {/* محتوى التبويب */}
      <div className="p-6">
        {tab === 'overview' ? (
          <p className="max-w-3xl leading-loose text-slate-600">{description}</p>
        ) : resources.length === 0 ? (
          <p className="text-sm text-slate-500">لا توجد مصادر لهذا الدرس.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {resources.map((resource) => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition hover:border-leaf/40 hover:bg-leaf/5 hover:shadow-sm"
              >
                <div>
                  <p className="font-bold text-slate-800 group-hover:text-leaf-dark">
                    {resource.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {resource.description}
                  </p>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-leaf-dark" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
