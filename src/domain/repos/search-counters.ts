import { SearchCounter } from '@domain/entities/search-counter.js'
import { DDD } from '@domain/values/ddd.js'

export interface ISearchCountersRepo {
  findByDdd(ddd: DDD): Promise<SearchCounter | null>
  save(entity: SearchCounter): Promise<void>
}
