import { defineConfig } from 'drizzle-kit'
import { rootDir } from './src/infra/env'

export default defineConfig({
  out: './src/infra/orm/migrations',
  schema: './src/infra/orm/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: `file:${rootDir}/ddd.sqlite3`,
  },
})
