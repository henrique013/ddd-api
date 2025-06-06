import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const citiesTable = sqliteTable('cities', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name', { length: 255 }).notNull(),
  state: text('state', { length: 2 }).notNull(),
  ddd: integer('ddd').notNull(),
})
