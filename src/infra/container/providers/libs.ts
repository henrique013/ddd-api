import { t } from '@infra/container/tokens.js'
import { DependencyContainer } from 'tsyringe'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from '@infra/orm/schema.js'
import { DrizzleSqlite } from '@infra/orm/types.js'
import { ROOT_DIR } from '@infra/env.js'

export function registerLibs(container: DependencyContainer) {
  const dbPath = `${ROOT_DIR}/ddd.sqlite3`
  const sqlite = new Database(dbPath)
  const drizzleSqlite: DrizzleSqlite = drizzle(sqlite, { schema })

  container.register(t.libs.DrizzleSqlite, {
    useValue: drizzleSqlite,
  })
}
