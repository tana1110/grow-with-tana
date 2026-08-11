import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import { PLATFORM_NAME, PLATFORM_DESCRIPTION } from '@/data/coursesData'
import './globals.css'

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
})

export const metadata: Metadata = {
  title: {
    default: `${PLATFORM_NAME} — هنا تكبر المهارات`,
    template: `%s | ${PLATFORM_NAME}`,
  },
  description: PLATFORM_DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
