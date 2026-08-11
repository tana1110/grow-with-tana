import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { getDatabaseUrl } from '@/lib/db-url'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function getClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaPg({ connectionString: getDatabaseUrl() })
    globalForPrisma.prisma = new PrismaClient({ adapter })
  }
  return globalForPrisma.prisma
}

/**
 * عميل كسول: لا يتصل بقاعدة البيانات إلا عند أول استعلام فعلي،
 * حتى لا يفشل `next build` أثناء تجميع الصفحات بدون DATABASE_URL.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const value = getClient()[prop as keyof PrismaClient]
    return typeof value === 'function' ? (value as (...args: unknown[]) => unknown).bind(getClient()) : value
  },
})
