import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { CityService } from '@domain/services/city.js'
import { CitiesSqliteRepo } from '@infra/repos/cities.sqlite.js'

export function registerServices(container: DependencyContainer) {
  container.register(t.services.ICityService, {
    useFactory: () => {
      const citiesRepo = container.resolve<CitiesSqliteRepo>(t.repos.ICitiesRepo)
      return new CityService(citiesRepo)
    },
  })
}
