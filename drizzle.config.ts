import { defineConfig } from 'drizzle-kit'
import { env } from './src/infra/env'

export default defineConfig({
  out: './src/infra/orm/migrations',
  schema: './src/infra/orm/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: env.SQLITE_DB_FILE_NAME,
  },
})
