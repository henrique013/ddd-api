import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  API_PORT: z.coerce.number().min(1024).max(49151),
  API_DEBUG: z.enum(['true', 'false']).transform((val) => val === 'true'),
  SQLITE_DB: z.string(),
  SENTRY_DSN: z.string().url().optional(),
})

export const env = envSchema.parse(process.env)
