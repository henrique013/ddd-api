import { BadArgumentError } from '@domain/errors/bad-argument.js'
import { DDD } from '@domain/values/ddd.js'
import { Id } from '@domain/values/id.js'
import { Name } from '@domain/values/name.js'
import { State } from '@domain/values/state.js'

export type CityRaw = {
  id?: number
  name: string
  state: string
  ddd: number
}

export class City {
  private constructor(
    public id: Id | undefined,
    public name: Name,
    public state: State,
    public ddd: DDD
  ) {}

  static fromRaw(raw: CityRaw): City {
    const id = raw.id ? Id.from(raw.id) : undefined
    const name = Name.from(raw.name)
    const state = State.from(raw.state)
    const ddd = DDD.from(raw.ddd)

    return new City(id, name, state, ddd)
  }

  idOrFail(): Id {
    if (!this.id) {
      throw new BadArgumentError('City id is required')
    }

    return this.id
  }
}
