import Link from 'next/link'
import { PLATFORM_NAME } from '@/data/coursesData'

/**
 * شعار Grow with Tana: برعم مبتسم ينمو من زرّ تشغيل —
 * "التعلّم بالفيديو الذي يجعلك تنمو". يهتز الورق بحركة لطيفة.
 */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {/* البطاقة الخلفية */}
      <rect x="2" y="2" width="60" height="60" rx="18" fill="#34b579" />
      <rect x="2" y="2" width="60" height="60" rx="18" fill="url(#logoShine)" />
      {/* دوائر زخرفية شفافة مثل بطاقات الأطفال */}
      <circle cx="52" cy="12" r="10" fill="#ffffff" opacity="0.14" />
      <circle cx="10" cy="54" r="8" fill="#ffffff" opacity="0.12" />
      {/* الورقتان (تهتزان) */}
      <g className="animate-wiggle">
        <path
          d="M32 30 C 32 20, 24 14, 15 14 C 15 24, 22 30, 32 30 Z"
          fill="#d3f26a"
        />
        <path
          d="M32 30 C 32 22, 39 16, 48 16 C 48 25, 41 30, 32 30 Z"
          fill="#f5e04b"
        />
      </g>
      {/* الساق */}
      <path
        d="M32 30 L32 38"
        stroke="#eafff3"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* زر التشغيل */}
      <circle cx="32" cy="46" r="10" fill="#ffffff" />
      <path d="M29 41.5 L38 46 L29 50.5 Z" fill="#f2735f" />
      <defs>
        <linearGradient id="logoShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5ecf9a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1d8a5c" stopOpacity="0.35" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'
  const text = size === 'lg' ? 'text-2xl' : 'text-lg'
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="transition group-hover:scale-110 group-hover:rotate-3">
        <LogoMark className={box} />
      </span>
      <span className={`${text} leading-none font-extrabold tracking-tight text-navy`}>
        {PLATFORM_NAME}
      </span>
    </Link>
  )
}
