import { City } from '@domain/entities/city.js'
import { ICitiesRepo } from '@domain/repos/cities.js'
import { DDD } from '@domain/values/ddd.js'
import { NotFoundError } from '@domain/errors/not-found.js'

export interface ICityService {
  findByDddOrFail(ddd: DDD): Promise<City[]>
}

export class CityService implements ICityService {
  constructor(private readonly citiesRepo: ICitiesRepo) {}

  async findByDddOrFail(ddd: DDD): Promise<City[]> {
    const cities = await this.citiesRepo.findByDdd(ddd)

    if (cities.length === 0) {
      throw new NotFoundError(`No cities found for DDD ${ddd.toString()}`)
    }

    return cities
  }
}
