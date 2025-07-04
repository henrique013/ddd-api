import { describe, it, expect } from 'vitest'
import { SearchCounter, SearchCounterRaw } from '@domain/entities/search-counter.js'
import { DDD } from '@domain/values/ddd.js'
import { Int4 } from '@domain/values/int4.js'

describe('SearchCounter', () => {
  describe('fromRaw', () => {
    it('should create instance with valid raw data', () => {
      const raw: SearchCounterRaw = {
        ddd: 11,
        counter: 0,
      }

      const searchCounter = SearchCounter.fromRaw(raw)

      expect(searchCounter.ddd).toBeInstanceOf(DDD)
      expect(searchCounter.counter).toBeInstanceOf(Int4)
      expect(searchCounter.ddd.toNumber()).toBe(11)
      expect(searchCounter.counter.toNumber()).toBe(0)
    })
  })

  describe('increment', () => {
    it('should increment counter from existing value', () => {
      const raw: SearchCounterRaw = {
        ddd: 11,
        counter: 42,
      }

      const searchCounter = SearchCounter.fromRaw(raw)
      searchCounter.increment()

      expect(searchCounter.counter.toNumber()).toBe(43)
    })

    it('should increment counter multiple times', () => {
      const raw: SearchCounterRaw = {
        ddd: 11,
        counter: 0,
      }

      const searchCounter = SearchCounter.fromRaw(raw)
      searchCounter.increment()
      searchCounter.increment()
      searchCounter.increment()

      expect(searchCounter.counter.toNumber()).toBe(3)
    })
  })

  describe('toRaw', () => {
    it('should convert instance to raw data', () => {
      const raw: SearchCounterRaw = {
        ddd: 11,
        counter: 0,
      }

      const searchCounter = SearchCounter.fromRaw(raw)
      const result = searchCounter.toRaw()

      expect(result).toEqual({
        ddd: 11,
        counter: 0,
      })
    })
  })
})
