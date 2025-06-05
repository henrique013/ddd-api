import { City } from '@domain/entities/city.js'
import { ICitiesRepo } from '@domain/repos/cities.js'
import { DDD } from '@domain/values/ddd.js'
import { citiesTable } from '@infra/orm/schema.js'
import { DrizzlePg } from '@infra/orm/types.js'
import { eq } from 'drizzle-orm'

export class CitiesPgRepo implements ICitiesRepo {
  constructor(private readonly db: DrizzlePg) {}

  async findByDdd(ddd: DDD): Promise<City[]> {
    const result = await this.db.select().from(citiesTable).where(eq(citiesTable.ddd, ddd.toNumber()))

    const cities = result.map(City.fromRaw)

    return cities
  }

  async createMany(cities: City[]): Promise<void> {
    const values = cities.map((city) => city.toRaw())

    await this.db.insert(citiesTable).values(values)
  }
}
