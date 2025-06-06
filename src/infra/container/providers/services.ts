import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { CityService } from '@domain/services/city.js'
import { CitiesSqliteRepo } from '@infra/repos/cities.sqlite.js'
import { DrizzleSqlite } from '@infra/orm/types.js'

export function registerServices(container: DependencyContainer) {
  container.register(t.services.ICityService, {
    useFactory: () => {
      const db = container.resolve<DrizzleSqlite>(t.libs.DrizzleSqlite)
      const citiesRepo = new CitiesSqliteRepo(db)
      return new CityService(citiesRepo)
    },
  })
}
