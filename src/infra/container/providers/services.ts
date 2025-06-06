import { DependencyContainer } from 'tsyringe'
import { t } from '@infra/container/tokens.js'
import { CityService } from '@domain/services/city.js'
import { vi } from 'vitest'

export function registerServices(container: DependencyContainer) {
  container.register(t.services.ICityService, {
    useFactory: () => {
      // TODO: Implement services

      const mockCitiesRepo = {
        findByDdd: vi.fn(),
        createMany: vi.fn(),
      }

      const mockCitiesExternalRepo = {
        findByDdd: vi.fn(),
      }

      return new CityService(mockCitiesRepo, mockCitiesExternalRepo)
    },
  })
}
