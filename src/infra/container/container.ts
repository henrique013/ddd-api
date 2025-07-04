import { container } from 'tsyringe'
import { registerLibs } from '@infra/container/providers/libs.js'
import { registerRepos } from '@infra/container/providers/repos.js'
import { registerServices } from '@infra/container/providers/services.js'
import { registerProviders } from './providers/providers.js'

await registerLibs(container)
registerProviders(container)
registerRepos(container)
registerServices(container)

export { container }
