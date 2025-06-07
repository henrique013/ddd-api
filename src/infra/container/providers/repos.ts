import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { CitiesSqliteRepo } from '@infra/repos/cities.sqlite.js'
import { DrizzleSqlite } from '@infra/orm/types.js'

export function registerRepos(container: DependencyContainer) {
  container.register(t.repos.ICitiesRepo, {
    useFactory: () => {
      const db = container.resolve<DrizzleSqlite>(t.libs.DrizzleSqlite)
      return new CitiesSqliteRepo(db)
    },
  })
}
