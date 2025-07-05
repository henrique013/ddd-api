import { describe, it, expect, vi } from 'vitest'
import { CityService } from '@domain/services/city.js'
import { City } from '@domain/entities/city.js'
import { DDD } from '@domain/values/ddd.js'
import { NotFoundError } from '@domain/errors/not-found.js'
import { CacheFakeProvider } from '@infra/providers/cache.fake.js'

describe('CityService', () => {
  describe('findByDddOrFail', () => {
    it('should return cities when found', async () => {
      const mockCities = [
        City.fromRaw({ name: 'São Paulo', state: 'SP', ddd: 11 }),
        City.fromRaw({ name: 'Campinas', state: 'SP', ddd: 11 }),
      ]

      const mockCitiesRepo = {
        findByDdd: vi.fn().mockResolvedValue(mockCities),
      }

      const cacheProvider = new CacheFakeProvider()

      const cityService = new CityService(mockCitiesRepo, cacheProvider)
      const ddd = DDD.from(11)
      const result = await cityService.findByDddOrFail(ddd)

      expect(mockCitiesRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(result).toEqual(mockCities)
    })

    it('should return cities from cache when available', async () => {
      const mockCities = [
        City.fromRaw({ name: 'São Paulo', state: 'SP', ddd: 11 }),
        City.fromRaw({ name: 'Campinas', state: 'SP', ddd: 11 }),
      ]

      const mockCitiesRepo = {
        findByDdd: vi.fn().mockResolvedValue(mockCities),
      }

      const cacheProvider = new CacheFakeProvider()

      const cityService = new CityService(mockCitiesRepo, cacheProvider)
      const ddd = DDD.from(11)

      // First call to populate cache
      await cityService.findByDddOrFail(ddd)

      // Reset mock to verify it won't be called again
      mockCitiesRepo.findByDdd.mockClear()

      // Second call should return from cache
      const result = await cityService.findByDddOrFail(ddd)

      expect(mockCitiesRepo.findByDdd).not.toHaveBeenCalled()
      expect(result).toEqual(mockCities)
    })

    it('should throw NotFoundError when no cities are found', async () => {
      const mockCitiesRepo = {
        findByDdd: vi.fn().mockResolvedValue([]),
      }

      const cacheProvider = new CacheFakeProvider()

      const cityService = new CityService(mockCitiesRepo, cacheProvider)
      const ddd = DDD.from(11)

      await expect(cityService.findByDddOrFail(ddd)).rejects.toThrow(NotFoundError)
      expect(mockCitiesRepo.findByDdd).toHaveBeenCalledWith(ddd)
    })
  })
})
