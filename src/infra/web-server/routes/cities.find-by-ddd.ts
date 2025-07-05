import { container } from '@infra/container/container.js'
import { t } from '@infra/container/tokens.js'
import { RouteOptions } from 'fastify'
import { CityService } from '@domain/services/city.js'
import { DDD } from '@domain/values/ddd.js'
import { ISearchCounterService } from '@domain/services/search-counter.js'

export const routeOpt: RouteOptions = {
  method: 'GET',
  url: '/cities/:ddd',
  schema: {
    params: {
      type: 'object',
      properties: {
        ddd: { type: 'number' },
      },
      required: ['ddd'],
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            state: { type: 'string' },
            ddd: { type: 'number' },
          },
          required: ['id', 'name', 'state', 'ddd'],
        },
      },
    },
  },
  handler: async function (request, reply) {
    const params = request.params as { ddd: number }
    const cityService = container.resolve<CityService>(t.services.CityService)
    const searchCounterService = container.resolve<ISearchCounterService>(t.services.ISearchCounterService)

    const ddd = DDD.from(params.ddd)

    const cities = await cityService.findByDddOrFail(ddd)

    await searchCounterService.increment(ddd)

    const json = cities.map((city) => city.toRaw())

    reply.send(json)
  },
}
