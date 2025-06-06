import { t } from '@infra/container/tokens.js'
import { DependencyContainer } from 'tsyringe'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from '@infra/orm/schema.js'
import { env } from '@infra/env.js'
import { DrizzleSqlite } from '@infra/orm/types.js'

export function registerLibs(container: DependencyContainer) {
  const sqlite = new Database(env.SQLITE_DB)
  const drizzleSqlite: DrizzleSqlite = drizzle(sqlite, { schema })

  container.register(t.libs.DrizzleSqlite, {
    useValue: drizzleSqlite,
  })
}
