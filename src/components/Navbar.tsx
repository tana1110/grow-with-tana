import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { getSession } from '@/lib/auth'
import Logo from '@/components/Logo'
import LogoutButton from '@/components/LogoutButton'

/** الشريط العلوي للصفحات العامة (الرئيسية، الدورات، صفحة الدورة). */
export default async function Navbar() {
  const session = await getSession()

  return (
    <header className="sticky top-0 z-30 border-b-2 border-navy/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-1 sm:flex">
            <Link
              href="/courses"
              className="rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-leaf/10 hover:text-leaf-dark"
            >
              الدورات
            </Link>
            {session && (
              <Link
                href="/my-courses"
                className="rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-leaf/10 hover:text-leaf-dark"
              >
                دوراتي
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <span className="hidden text-sm font-semibold text-slate-500 md:inline">
                أهلًا، {session.name} 👋
              </span>
              <Link
                href="/my-courses"
                className="inline-flex items-center gap-2 rounded-xl bg-leaf px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-leaf-dark sm:hidden"
              >
                <GraduationCap className="h-4 w-4" />
                دوراتي
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-coral px-4 py-2 text-sm font-extrabold text-white shadow-md shadow-coral/25 transition duration-300 hover:scale-105 hover:bg-coral-dark"
              >
                أنشئ حسابك مجانًا
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
