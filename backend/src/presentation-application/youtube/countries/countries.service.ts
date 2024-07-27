import { Inject, Injectable } from '@nestjs/common'
import { Countries, CountryRepository } from '@domain/youtube'

@Injectable()
export class CountriesService {
  constructor(
    @Inject('CountryRepository')
    private readonly countryRepository: CountryRepository
  ) {}

  async findAll(): Promise<Countries> {
    return await this.countryRepository.findAll()
  }
}
