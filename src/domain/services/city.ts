import { City, CityRaw } from '@domain/entities/city.js'
import { ICitiesRepo } from '@domain/repos/cities.js'
import { DDD } from '@domain/values/ddd.js'
import { NotFoundError } from '@domain/errors/not-found.js'
import { ICacheProvider } from '@domain/providers/cache.js'

export class CityService {
  public readonly CACHE_TTL_SECONDS = 60 * 60 * 24 // 1 day

  constructor(
    private readonly citiesRepo: ICitiesRepo,
    private readonly cache: ICacheProvider
  ) {}

  async findByDddOrFail(ddd: DDD): Promise<City[]> {
    const cacheKey = `cities_by_ddd:${ddd.toString()}`

    // Try to get from cache first
    const cachedCities = await this.cache.get<CityRaw[]>(cacheKey)
    if (cachedCities) {
      const cities = cachedCities.map(City.fromRaw)
      return cities
    }

    // If not in cache, get from repository
    const cities = await this.citiesRepo.findByDdd(ddd)

    if (cities.length === 0) {
      throw new NotFoundError(`No cities found for DDD ${ddd.toString()}`)
    }

    // Cache the result for future requests
    const citiesRaw = cities.map((city) => city.toRaw())
    await this.cache.set<CityRaw[]>(cacheKey, citiesRaw, this.CACHE_TTL_SECONDS)

    return cities
  }
}
