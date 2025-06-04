import { container } from 'tsyringe'
import { registerLibs } from '@infra/container/providers/libs.js'
import { registerServices } from '@infra/container/providers/services.js'

registerLibs(container)
registerServices(container)

export { container }
