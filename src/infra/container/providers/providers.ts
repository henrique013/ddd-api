import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { CacheFakeProvider } from '@infra/providers/cache.fake.js'

export function registerProviders(container: DependencyContainer) {
  container.register(t.providers.ICacheProvider, {
    useValue: new CacheFakeProvider(),
  })
}
