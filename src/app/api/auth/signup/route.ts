import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 },
      )
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } })
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 },
      )
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name: name.trim(), email: normalizedEmail, password: hashed },
    })

    await createSession({ userId: user.id, email: user.email, name: user.name })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
