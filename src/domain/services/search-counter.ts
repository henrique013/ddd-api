import { SearchCounter } from '@domain/entities/search-counter.js'
import { ISearchCountersRepo } from '@domain/repos/search-counters.js'
import { DDD } from '@domain/values/ddd.js'

export interface ISearchCounterService {
  increment(ddd: DDD): Promise<void>
}

export class SearchCounterService implements ISearchCounterService {
  constructor(private readonly searchCountersRepo: ISearchCountersRepo) {}

  async increment(ddd: DDD): Promise<void> {
    const existingCounter = await this.searchCountersRepo.findByDdd(ddd)

    const counter = existingCounter ?? SearchCounter.fromRaw({ ddd: ddd.toNumber(), counter: 0 })

    counter.increment()

    await this.searchCountersRepo.save(counter)
  }
}
