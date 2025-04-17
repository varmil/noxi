import { Injectable } from '@nestjs/common'
import { NextContinuationRepository } from '@domain/next-continuation'
import { NextContinuationTranslator } from '@infra/next-continuation/NextContinuationTranslator'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class NextContinuationRepositoryImpl
  implements NextContinuationRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  findOne: NextContinuationRepository['findOne'] = async ({
    where: { videoId },
    orderBy
  }) => {
    const row = await this.prismaInfraService.nextContinuation.findFirst({
      where: { videoId: videoId.get() },
      orderBy
    })
    if (!row) return null
    return new NextContinuationTranslator(row).translate()
  }

  async save({
    data: { videoId, nextContinuation, latestPublishedAt, createdAt }
  }: Parameters<NextContinuationRepository['save']>[0]) {
    await this.prismaInfraService.nextContinuation.create({
      data: {
        videoId: videoId.get(),
        // 終了を考えて、nullを入れる
        nextContinuation: nextContinuation?.get() ?? null,
        latestPublishedAt: latestPublishedAt.get(),
        createdAt
      }
    })
  }

  async delete({
    where: { videoId }
  }: Parameters<NextContinuationRepository['delete']>[0]) {
    await this.prismaInfraService.nextContinuation.deleteMany({
      where: { videoId: videoId.get() }
    })
  }
}
