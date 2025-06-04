import { City } from '@domain/entities/city.js'
import { DDD } from '@domain/values/ddd.js'

/**
 * This interface is used to find cities by DDD from an external source.
 */
export interface ICitiesExternalRepo {
  findByDdd(ddd: DDD): Promise<City[]>
}
