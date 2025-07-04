import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { CitiesPgRepo } from '@infra/repos/cities.pg.js'
import { DrizzlePg } from '@infra/orm/types.js'
import { SearchCountersPgRepo } from '@infra/repos/search-counters.pg.js'
import { Publisher } from 'rabbitmq-client'

export function registerRepos(container: DependencyContainer) {
  const db = container.resolve<DrizzlePg>(t.libs.DrizzlePg)
  const pub = container.resolve<Publisher>(t.libs.RabbitMQPublisher)

  container.register(t.repos.ICitiesRepo, {
    useFactory: () => new CitiesPgRepo(db),
  })

  container.register(t.repos.ISearchCountersRepo, {
    useFactory: () => new SearchCountersPgRepo(db, pub),
  })
}
