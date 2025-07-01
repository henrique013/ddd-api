import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { CitiesPgRepo } from '@infra/repos/cities.pg.js'
import { DrizzlePg } from '@infra/orm/types.js'

export function registerRepos(container: DependencyContainer) {
  container.register(t.repos.ICitiesRepo, {
    useFactory: () => {
      const db = container.resolve<DrizzlePg>(t.libs.DrizzlePg)
      return new CitiesPgRepo(db)
    },
  })
}
