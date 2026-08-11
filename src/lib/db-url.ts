/**
 * رابط قاعدة البيانات — يدعم أسماء المتغيرات التي تضيفها تكاملات Vercel تلقائيًا
 * (Neon يضيف DATABASE_URL، وتكاملات Postgres الأقدم تضيف POSTGRES_PRISMA_URL / POSTGRES_URL).
 */
export function getDatabaseUrl(): string {
  const url =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL
  if (!url || !/^postgres(ql)?:\/\//.test(url)) {
    throw new Error(
      'DATABASE_URL is missing or not a Postgres URL. ' +
        'On Vercel: open the project → Storage → Create Database → Neon, then redeploy.',
    )
  }
  return url
}
