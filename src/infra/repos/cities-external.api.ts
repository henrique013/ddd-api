import { City, CityRaw } from '@domain/entities/city.js'
import { RuntimeError } from '@domain/errors/runtime.js'
import { ICitiesExternalRepo } from '@domain/repos/cities-external.js'
import { DDD } from '@domain/values/ddd.js'

type DddRespJson = {
  state: string
  cities: string[]
}

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

    const data: DddRespJson = await response.json()

    const cities: City[] = []

    for (const cityName of data.cities) {
      const cityRaw: CityRaw = {
        name: cityName,
        state: data.state,
        ddd: ddd.toNumber(),
      }

      const city = City.fromRaw(cityRaw)

      cities.push(city)
    }

    return cities
  }
}
