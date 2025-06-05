import { City } from '@domain/entities/city.js'
import { RuntimeError } from '@domain/errors/runtime.js'
import { ICitiesExternalRepo } from '@domain/repos/cities-external.js'
import { DDD } from '@domain/values/ddd.js'

export class CitiesExternalApiRepo implements ICitiesExternalRepo {
  private readonly BASE_URL = 'https://brasilapi.com.br/api/ddd/v1'

  async findByDdd(ddd: DDD): Promise<City[]> {
    const url = `${this.BASE_URL}/${ddd.toNumber()}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new RuntimeError(`Failed to fetch cities for DDD ${ddd.toNumber()}`, {
        status: response.status,
        statusText: response.statusText,
        body: await response.text(),
      })
    }

    const data = await response.json()

    const cities = data.map(City.fromRaw)

    return cities
  }
}
