import { DrizzlePg } from '@infra/orm/types.js'
import { ICitiesRepo } from '@domain/repos/cities.js'
import { City } from '@domain/entities/city.js'
import { citiesTable } from '@infra/orm/schema.js'
import { asc, eq } from 'drizzle-orm'
import { DDD } from '@domain/values/ddd.js'

export class CitiesPgRepo implements ICitiesRepo {
  constructor(private readonly db: DrizzlePg) {}

  async findByDdd(ddd: DDD): Promise<City[]> {
    const result = await this.db
      .select()
      .from(citiesTable)
      .where(eq(citiesTable.ddd, ddd.toNumber()))
      .orderBy(asc(citiesTable.name))

    const cities = result.map(City.fromRaw)

    return cities
  }
}
