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

  async count(args: Parameters<SupersBundleRepository['count']>[0]) {
    return await this.supersBundleRepository.count(args)
  }

  async findOne(args: Parameters<SupersBundleRepository['findOne']>[0]) {
    return await this.supersBundleRepository.findOne(args)
  }

  async findRank(args: Parameters<SupersBundleRepository['findRank']>[0]) {
    return await this.supersBundleRepository.findRank(args)
  }

  async save(args: Parameters<SupersBundleRepository['save']>[0]) {
    await this.supersBundleRepository.save(args)
  }

  async sum(args: Parameters<SupersBundleRepository['sum']>[0]) {
    return await this.supersBundleRepository.sum(args)
  }

  async countSum(args: Parameters<SupersBundleRepository['countSum']>[0]) {
    return await this.supersBundleRepository.countSum(args)
  }
}
