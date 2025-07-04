import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { CityService } from '@domain/services/city.js'
import { ICitiesRepo } from '@domain/repos/cities.js'
import { ISearchCountersRepo } from '@domain/repos/search-counters.js'
import { SearchCounterService } from '@domain/services/search-counter.js'

export function registerServices(container: DependencyContainer) {
  container.register(t.services.ICityService, {
    useFactory: () => {
      const citiesRepo = container.resolve<ICitiesRepo>(t.repos.ICitiesRepo)
      return new CityService(citiesRepo)
    },
  })

  container.register(t.services.ISearchCounterService, {
    useFactory: () => {
      const searchCountersRepo = container.resolve<ISearchCountersRepo>(t.repos.ISearchCountersRepo)
      return new SearchCounterService(searchCountersRepo)
    },
  })
}
