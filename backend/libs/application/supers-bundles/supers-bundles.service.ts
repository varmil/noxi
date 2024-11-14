import { Inject, Injectable } from '@nestjs/common'
import { SupersBundleRepository } from '@domain/supers-bundle'

@Injectable()
export class SupersBundlesService {
  constructor(
    @Inject('SupersBundleRepository')
    private readonly supersBundleRepository: SupersBundleRepository
  ) {}

  async findAll(args: Parameters<SupersBundleRepository['findAll']>[0]) {
    return await this.supersBundleRepository.findAll(args)
  }

  async findOne(args: Parameters<SupersBundleRepository['findOne']>[0]) {
    return await this.supersBundleRepository.findOne(args)
  }

  async save(args: Parameters<SupersBundleRepository['save']>[0]) {
    await this.supersBundleRepository.save(args)
  }
}
