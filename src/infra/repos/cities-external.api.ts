import { City, CityRaw } from '@domain/entities/city.js'
import { RuntimeError } from '@domain/errors/runtime.js'
import { ICitiesExternalRepo } from '@domain/repos/cities-external.js'
import { DDD } from '@domain/values/ddd.js'
import axios from 'axios'

type DddRespJson = {
  state: string
  cities: string[]
}

export class CitiesExternalApiRepo implements ICitiesExternalRepo {
  private readonly BASE_URL = 'https://brasilapi.com.br/api/ddd/v1'
  private readonly client = axios.create({
    timeout: 60000,
    baseURL: this.BASE_URL,
  })

  async findByDdd(ddd: DDD): Promise<City[]> {
    try {
      const { data } = await this.client.get<DddRespJson>(`/${ddd.toNumber()}`)

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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new RuntimeError(`Failed to fetch cities for DDD ${ddd.toNumber()}`, {
          status: error.response?.status,
          statusText: error.response?.statusText,
          body: error.response?.data,
        })
      }
      throw error
    }
  }
}
