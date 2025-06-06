import { City } from '@domain/entities/city.js'
import { DDD } from '@domain/values/ddd.js'

export interface ICitiesRepo {
  findByDdd(ddd: DDD): Promise<City[]>
}
