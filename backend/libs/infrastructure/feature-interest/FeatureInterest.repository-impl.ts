import { Injectable } from '@nestjs/common'
import { FeatureInterestRepository, Comment, FeatureId  } from '@domain/feature-interest'
import { UserId } from '@domain/user'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class FeatureInterestRepositoryImpl
  implements FeatureInterestRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async create(args: {
    userId?: UserId
    featureId: FeatureId
    comment?: Comment
  }): Promise<void> {
    await this.prismaInfraService.featureInterest.create({
      data: {
        userId: args.userId?.get(),
        featureId: args.featureId.get(),
        comment: args.comment?.get()
      }
    })
  }
}
