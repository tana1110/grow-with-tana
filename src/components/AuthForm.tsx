'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Mail, Lock, User } from 'lucide-react'
import Logo from '@/components/Logo'

interface AuthFormProps {
  mode: 'login' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isSignup = mode === 'signup'

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isSignup ? { name, email, password } : { email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'حدث خطأ ما، حاول مرة أخرى.')
        return
      }
      router.push(searchParams.get('from') ?? '/my-courses')
      router.refresh()
    } catch {
      setError('خطأ في الاتصال — حاول مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-white to-leaf/5 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>

        <div className="animate-pop rounded-3xl border-2 border-navy/5 bg-white p-8 shadow-lg shadow-slate-200/50">
          <h1 className="mb-1 text-2xl font-extrabold text-navy">
            {isSignup ? 'أنشئ حسابك' : 'أهلًا بعودتك'}
          </h1>
          <p className="mb-6 text-sm text-slate-500">
            {isSignup
              ? 'سجّل مجانًا لتبدأ التعلّم ويُحفظ تقدّمك تلقائيًا.'
              : 'سجّل الدخول لتكمل من حيث توقفت.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: سارة أحمد"
                    className="w-full rounded-lg border border-slate-300 py-2.5 pe-3 ps-10 text-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 py-2.5 pe-3 ps-10 text-start text-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignup ? '6 أحرف على الأقل' : '••••••••'}
                  className="w-full rounded-lg border border-slate-300 py-2.5 pe-3 ps-10 text-start text-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-coral py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-coral-dark disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSignup ? 'إنشاء الحساب' : 'تسجيل الدخول'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isSignup ? 'لديك حساب بالفعل؟ ' : 'ليس لديك حساب؟ '}
            <Link
              href={isSignup ? '/login' : '/signup'}
              className="font-bold text-coral hover:text-coral-dark"
            >
              {isSignup ? 'سجّل الدخول' : 'أنشئ حسابًا'}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
