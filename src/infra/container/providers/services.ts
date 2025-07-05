import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { CityService } from '@domain/services/city.js'
import { ICitiesRepo } from '@domain/repos/cities.js'
import { ISearchCountersRepo } from '@domain/repos/search-counters.js'
import { SearchCounterService } from '@domain/services/search-counter.js'
import { ICacheProvider } from '@domain/providers/cache.js'

export function registerServices(container: DependencyContainer) {
  container.register(t.services.CityService, {
    useFactory: () => {
      const citiesRepo = container.resolve<ICitiesRepo>(t.repos.ICitiesRepo)
      const cache = container.resolve<ICacheProvider>(t.providers.ICacheProvider)
      return new CityService(citiesRepo, cache)
    },
  })

  container.register(t.services.SearchCounterService, {
    useFactory: () => {
      const searchCountersRepo = container.resolve<ISearchCountersRepo>(t.repos.ISearchCountersRepo)
      return new SearchCounterService(searchCountersRepo)
    },
  })
}
