import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { CityService } from '@domain/services/city.js'
import { ICitiesRepo } from '@domain/repos/cities.js'

export function registerServices(container: DependencyContainer) {
  container.register(t.services.ICityService, {
    useFactory: () => {
      const citiesRepo = container.resolve<ICitiesRepo>(t.repos.ICitiesRepo)
      return new CityService(citiesRepo)
    },
  })
}
