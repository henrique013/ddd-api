import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { ICitiesRepo } from '@domain/repos/cities.js'
import { ICitiesExternalRepo } from '@domain/repos/cities-external.js'
import { CityService } from '@domain/services/city.js'

export function registerServices(container: DependencyContainer) {
  container.register(t.services.ICityService, {
    useFactory: (container) => {
      const citiesRepo = container.resolve<ICitiesRepo>(t.repos.ICitiesRepo)
      const citiesExternalRepo = container.resolve<ICitiesExternalRepo>(t.repos.ICitiesExternalRepo)
      return new CityService(citiesRepo, citiesExternalRepo)
    },
  })
}
