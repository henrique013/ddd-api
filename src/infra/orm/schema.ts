import { char, integer, pgTable, varchar, unique, index } from 'drizzle-orm/pg-core'

export const citiesTable = pgTable(
  'cities',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 255 }).notNull(),
    state: char('state', { length: 2 }).notNull(),
    ddd: integer('ddd').notNull(),
  },
  (table) => [unique().on(table.name, table.state), index().on(table.ddd)]
)
