import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '@infra/orm/schema.js'

export type DrizzleSqlite = BetterSQLite3Database<typeof schema>
