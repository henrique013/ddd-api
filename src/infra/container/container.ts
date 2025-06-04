import { container } from 'tsyringe'
import { registerLibs } from '@infra/container/providers/libs.js'

registerLibs(container)

export { container }
