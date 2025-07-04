import { DDD } from '@domain/values/ddd.js'
import { Int4 } from '@domain/values/int4.js'

export type SearchCounterRaw = {
  ddd: number
  counter: number
}

export class SearchCounter {
  private constructor(
    public ddd: DDD,
    public counter: Int4
  ) {}

  static fromRaw(raw: SearchCounterRaw): SearchCounter {
    const ddd = DDD.from(raw.ddd)
    const counter = Int4.from(raw.counter)

    return new SearchCounter(ddd, counter)
  }

  increment(): void {
    this.counter = Int4.from(this.counter.toNumber() + 1)
  }

  toRaw(): SearchCounterRaw {
    return {
      ddd: this.ddd.toNumber(),
      counter: this.counter.toNumber(),
    }
  }
}
