import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CityService } from '@domain/services/city.js'
import { City } from '@domain/entities/city.js'
import { DDD } from '@domain/values/ddd.js'
import { NotFoundError } from '@domain/errors/not-found.js'

describe('CityService', () => {
  const mockCitiesRepo = {
    findByDdd: vi.fn(),
    create: vi.fn(),
  }

  const mockCitiesExternalRepo = {
    findByDdd: vi.fn(),
  }

  const cityService = new CityService(mockCitiesRepo, mockCitiesExternalRepo)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('findByDddOrFail', () => {
    it('should return cities from local repository when found', async () => {
      const ddd = DDD.from(11)
      const cities = [
        City.fromRaw({ name: 'São Paulo', state: 'SP', ddd: 11 }),
        City.fromRaw({ name: 'Guarulhos', state: 'SP', ddd: 11 }),
      ]

      mockCitiesRepo.findByDdd.mockResolvedValueOnce(cities)

      const result = await cityService.findByDddOrFail(ddd)

      expect(result).toEqual(cities)
      expect(mockCitiesRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockCitiesExternalRepo.findByDdd).not.toHaveBeenCalled()
      expect(mockCitiesRepo.create).not.toHaveBeenCalled()
    })

    it('should fetch from external repository and save to local when not found locally', async () => {
      const ddd = DDD.from(11)
      const localCities: City[] = []
      const externalCities = [
        City.fromRaw({ name: 'São Paulo', state: 'SP', ddd: 11 }),
        City.fromRaw({ name: 'Guarulhos', state: 'SP', ddd: 11 }),
      ]

      mockCitiesRepo.findByDdd.mockResolvedValueOnce(localCities)
      mockCitiesExternalRepo.findByDdd.mockResolvedValueOnce(externalCities)

      const result = await cityService.findByDddOrFail(ddd)

      expect(result).toEqual(externalCities)
      expect(mockCitiesRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockCitiesExternalRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockCitiesRepo.create).toHaveBeenCalledTimes(2)
      expect(mockCitiesRepo.create).toHaveBeenCalledWith(externalCities[0])
      expect(mockCitiesRepo.create).toHaveBeenCalledWith(externalCities[1])
    })

    it('should throw NotFoundError when no cities are found in both repositories', async () => {
      const ddd = DDD.from(11)
      const localCities: City[] = []
      const externalCities: City[] = []

      mockCitiesRepo.findByDdd.mockResolvedValueOnce(localCities)
      mockCitiesExternalRepo.findByDdd.mockResolvedValueOnce(externalCities)

      await expect(cityService.findByDddOrFail(ddd)).rejects.toThrow(NotFoundError)

      expect(mockCitiesRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockCitiesExternalRepo.findByDdd).toHaveBeenCalledWith(ddd)
      expect(mockCitiesRepo.create).not.toHaveBeenCalled()
    })
  })
})
