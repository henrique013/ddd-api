import { DrizzlePg } from '@infra/orm/types.js'
import { ISearchCountersRepo } from '@domain/repos/search-counters.js'
import { SearchCounter } from '@domain/entities/search-counter.js'
import { searchCountersTable } from '@infra/orm/schema.js'
import { eq } from 'drizzle-orm'
import { DDD } from '@domain/values/ddd.js'

export class SearchCountersPgRepo implements ISearchCountersRepo {
  constructor(private readonly db: DrizzlePg) {}

  async findByDdd(ddd: DDD): Promise<SearchCounter | null> {
    const result = await this.db
      .select()
      .from(searchCountersTable)
      .where(eq(searchCountersTable.ddd, ddd.toNumber()))
      .limit(1)

    const row = result[0]
    if (!row) {
      return null
    }

    return SearchCounter.fromRaw(row)
  }

  async save(entity: SearchCounter): Promise<void> {
    const raw = entity.toRaw()

    await this.db
      .insert(searchCountersTable)
      .values(raw)
      .onConflictDoUpdate({
        target: searchCountersTable.ddd,
        set: {
          counter: raw.counter,
        },
      })
  }
}
