import { Inject, Injectable } from '@nestjs/common'
import {
  Comment,
  FeatureId,
  FeatureInterestRepository
} from '@domain/feature-interest'
import { UserId } from '@domain/user'

@Injectable()
export class FeatureInterestsService {
  constructor(
    @Inject('FeatureInterestRepository')
    private readonly featureInterestRepository: FeatureInterestRepository
  ) {}

  async create(args: {
    userId?: UserId
    featureId: FeatureId
    comment?: Comment
  }): Promise<void> {
    await this.featureInterestRepository.create(args)
  }
}
