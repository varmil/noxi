import { Countries } from '@domain/youtube'

export interface CountryRepository {
  findAll: () => Promise<Countries>
}
