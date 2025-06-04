import { describe, it, expect } from 'vitest'
import { City, CityRaw } from '@domain/entities/city.js'
import { BadArgumentError } from '@domain/errors/bad-argument.js'
import { Id } from '@domain/values/id.js'
import { Name } from '@domain/values/name.js'
import { State } from '@domain/values/state.js'
import { DDD } from '@domain/values/ddd.js'

describe('City', () => {
  describe('fromRaw', () => {
    it('should create instance with valid raw data', () => {
      const raw: CityRaw = {
        name: 'São Paulo',
        state: 'SP',
        ddd: 11,
      }

      const city = City.fromRaw(raw)

      expect(city.name).toBeInstanceOf(Name)
      expect(city.state).toBeInstanceOf(State)
      expect(city.ddd).toBeInstanceOf(DDD)
      expect(city.id).toBeNull()
    })

    it('should create instance with id when provided', () => {
      const raw: CityRaw = {
        id: 1,
        name: 'São Paulo',
        state: 'SP',
        ddd: 11,
      }

      const city = City.fromRaw(raw)

      expect(city.id).toBeInstanceOf(Id)
      expect(city.name).toBeInstanceOf(Name)
      expect(city.state).toBeInstanceOf(State)
      expect(city.ddd).toBeInstanceOf(DDD)
    })
  })

  describe('idOrFail', () => {
    it('should return id when it exists', () => {
      const raw: CityRaw = {
        id: 1,
        name: 'São Paulo',
        state: 'SP',
        ddd: 11,
      }

      const city = City.fromRaw(raw)
      const id = city.idOrFail()

      expect(id).toBeInstanceOf(Id)
      expect(id.toNumber()).toBe(1)
    })

    it('should throw BadArgumentError when id is undefined', () => {
      const raw: CityRaw = {
        name: 'São Paulo',
        state: 'SP',
        ddd: 11,
      }

      const city = City.fromRaw(raw)

      expect(() => city.idOrFail()).toThrow(BadArgumentError)
    })
  })
})
