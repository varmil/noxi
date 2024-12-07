import { Injectable } from '@nestjs/common'
import {
  Prisma,
  type YoutubeStreamChatCount as PrismaChatCount
} from '@prisma/client'
import { ChatCountRepository, ChatCounts } from '@domain/stream-stats/chat'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { ChatCountTranslator } from '@infra/stream-stats/ChatCountTranslator'

@Injectable()
export class ChatCountRepositoryImpl implements ChatCountRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where: { videoId }
  }: Parameters<ChatCountRepository['findAll']>[0]) {
    const WHERE = Prisma.sql`WHERE 
      "videoId" = ${videoId.get()} AND
      "all" > 0
    `
    const GROUP_BY = Prisma.sql`GROUP BY 
      DATE_TRUNC('minute', "createdAt")
    `
    let skipInterval: Prisma.Sql = Prisma.empty

    // max 50 でinterval select
    {
      type RawCount = [{ count: bigint }]
      const [{ count }] = await this.prismaInfraService.$queryRaw<RawCount>`
        SELECT COUNT(*) as count
        FROM (
          SELECT sum("all") as all 
          FROM "YoutubeStreamChatCount"
          ${WHERE}
          ${GROUP_BY}
        )
      `
      const quotient = Math.floor(Number(count) / 50)
      if (quotient > 1) {
        console.log(`c=${count}, q=${quotient}, videoId=${videoId.get()}`)
        skipInterval = Prisma.sql`WHERE "id" % ${quotient} = 0`
      }
    }

    const rows = await this.prismaInfraService.$queryRaw<PrismaChatCount[]>`
      SELECT t.*
      FROM (
        SELECT row_number() OVER(ORDER BY "createdAt" ASC) AS "id", t2.*
        FROM (
          SELECT 
            max("videoId") as "videoId", -- 適当
            sum("all") as all, 
            sum("member") as member,
            max("latestPublishedAt") as "latestPublishedAt", -- 適当
            DATE_TRUNC('minute', max("createdAt")) as "createdAt"
          FROM "YoutubeStreamChatCount"
          ${WHERE}
          ${GROUP_BY}
          ORDER BY "createdAt" ASC
        ) t2
      ) t
      ${skipInterval}
    `
    return new ChatCounts(
      rows.map(row => new ChatCountTranslator(row).translate())
    )
  }

  findAllRaw: ChatCountRepository['findAllRaw'] = async ({
    where: { videoId, createdAt },
    orderBy
  }) => {
    const rows = await this.prismaInfraService.youtubeStreamChatCount.findMany({
      where: {
        videoId: videoId.get(),
        createdAt: { gte: createdAt.gte, lt: createdAt.lt }
      },
      orderBy
    })
    return new ChatCounts(
      rows.map(row => new ChatCountTranslator(row).translate())
    )
  }

  findOne: ChatCountRepository['findOne'] = async ({
    where: { videoId },
    orderBy
  }) => {
    const row = await this.prismaInfraService.youtubeStreamChatCount.findFirst({
      where: { videoId: videoId.get() },
      orderBy
    })
    if (!row) return null
    return new ChatCountTranslator(row).translate()
  }

  async save({
    data: {
      videoId,
      all,
      member,
      nextContinuation,
      latestPublishedAt,
      createdAt
    }
  }: Parameters<ChatCountRepository['save']>[0]) {
    await this.prismaInfraService.youtubeStreamChatCount.create({
      data: {
        videoId: videoId.get(),
        all: all.get(),
        member: member.get(),
        // 終了を考えて、nullを入れる
        nextContinuation: nextContinuation?.get() ?? null,
        latestPublishedAt: latestPublishedAt.get(),
        createdAt
      }
    })
  }

  async bundle({
    where: { videoId, createdAt },
    data
  }: Parameters<ChatCountRepository['bundle']>[0]) {
    const prisma = this.prismaInfraService
    await prisma.$transaction([
      // delete first
      prisma.youtubeStreamChatCount.deleteMany({
        where: {
          videoId: videoId.get(),
          createdAt: { gte: createdAt.gte, lt: createdAt.lt }
        }
      }),
      // then insert bundled data
      prisma.youtubeStreamChatCount.createMany({
        data: data.map(
          ({ videoId, all, member, latestPublishedAt, createdAt }) => ({
            videoId: videoId.get(),
            all: all.get(),
            member: member.get(),
            latestPublishedAt: latestPublishedAt.get(),
            createdAt
          })
        )
      })
    ])
  }
}
