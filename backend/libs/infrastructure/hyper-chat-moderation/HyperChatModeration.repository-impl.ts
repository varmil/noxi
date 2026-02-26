import { Injectable } from '@nestjs/common'
import { HyperChatId } from '@domain/hyper-chat'
import {
  HyperChatModeration,
  HyperChatModerationRepository,
  ModerationStatus,
  ModerationStatusValue
} from '@domain/hyper-chat-moderation'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class HyperChatModerationRepositoryImpl implements HyperChatModerationRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  upsert: HyperChatModerationRepository['upsert'] = async ({
    hyperChatId,
    status
  }) => {
    await this.prismaInfraService.hyperChatModeration.upsert({
      where: { hyperChatId: hyperChatId.get() },
      create: {
        hyperChatId: hyperChatId.get(),
        status: status.get()
      },
      update: {
        status: status.get()
      }
    })
  }

  delete: HyperChatModerationRepository['delete'] = async hyperChatId => {
    await this.prismaInfraService.hyperChatModeration.deleteMany({
      where: { hyperChatId: hyperChatId.get() }
    })
  }

  findOne: HyperChatModerationRepository['findOne'] = async ({ where }) => {
    const row = await this.prismaInfraService.hyperChatModeration.findUnique({
      where: { hyperChatId: where.hyperChatId.get() }
    })

    return row ? this.toDomain(row) : null
  }

  private toDomain(row: {
    hyperChatId: number
    status: string
    createdAt: Date
    updatedAt: Date
  }): HyperChatModeration {
    return new HyperChatModeration({
      hyperChatId: new HyperChatId(row.hyperChatId),
      status: new ModerationStatus(row.status as ModerationStatusValue),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    })
  }
}
