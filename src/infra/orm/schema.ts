import { index, integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const citiesTable = pgTable(
  'cities',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 255 }).notNull(),
    state: varchar('state', { length: 2 }).notNull(),
    ddd: integer('ddd').notNull(),
  },
  (table) => [index('cities_ddd_idx').on(table.ddd)]
)
