import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { DrizzlePg } from '@infra/orm/types.js'
import { CitiesPgRepo } from '@infra/repos/cities.pg.js'
import { CitiesExternalApiRepo } from '@infra/repos/cities-external.api.js'

export function registerRepos(container: DependencyContainer) {
  container.register(t.repos.ICities, {
    useFactory: (container) => {
      const db = container.resolve<DrizzlePg>(t.libs.DrizzlePg)
      return new CitiesPgRepo(db)
    },
  })

  container.register(t.repos.ICitiesExternal, {
    useClass: CitiesExternalApiRepo,
  })
}
