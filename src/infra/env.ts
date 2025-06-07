import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  API_PORT: z.coerce.number().min(1024).max(49151),
  API_DEBUG: z.enum(['true', 'false']).transform((val) => val === 'true'),
  API_CORS_ORIGINS: z.string().url().optional(),
  SENTRY_DSN: z.string().url().optional(),
})

/**
 * The environment variables parsed from the process.env.
 */
export const env = envSchema.parse(process.env)

/**
 * The root directory of the project.
 */
export const rootDir = resolve(__dirname, '../../')
