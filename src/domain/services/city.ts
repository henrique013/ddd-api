import { City } from '@domain/entities/city.js'
import { ICitiesExternalRepo } from '@domain/repos/cities-external.js'
import { ICitiesRepo } from '@domain/repos/cities.js'
import { DDD } from '@domain/values/ddd.js'
import { NotFoundError } from '@domain/errors/not-found.js'

export interface ICityService {
  findByDddOrFail(ddd: DDD): Promise<City[]>
}

export class CityService implements ICityService {
  constructor(
    private readonly citiesRepo: ICitiesRepo,
    private readonly citiesExternalRepo: ICitiesExternalRepo
  ) {}

  async findByDddOrFail(ddd: DDD): Promise<City[]> {
    const cities = await this.citiesRepo.findByDdd(ddd)

    if (cities.length > 0) {
      return cities
    }

    const externalCities = await this.citiesExternalRepo.findByDdd(ddd)

    if (externalCities.length === 0) {
      throw new NotFoundError(`No cities found for DDD ${ddd.toString()}`)
    }

    const newCities = await this.citiesRepo.createMany(externalCities)

    return newCities
  }
}
