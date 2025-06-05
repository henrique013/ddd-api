import { container } from 'tsyringe'
import { registerLibs } from '@infra/container/providers/libs.js'
import { registerRepos } from '@infra/container/providers/repos.js'

registerLibs(container)
registerRepos(container)

export { container }
