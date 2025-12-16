import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { Prisma } from '@prisma/generated/client'
import { CountryCode, LanguageTag } from '@domain/country'
import { GroupId } from '@domain/group'
import { Gender } from '@domain/lib'
import {
  ChannelId,
  Channel,
  Channels,
  ChannelRepository,
  ChannelStatistics,
  BrandingSettings,
  ChannelBasicInfo,
  ContentDetails,
  Keyword,
  Keywords,
  PeakXChannelProps
} from '@domain/youtube/channel'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import type { Channel as PrismaChannel } from '@prisma/generated/client'

@Injectable()
export class ChannelRepositoryImpl implements ChannelRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where,
    orderBy,
    limit,
    offset
  }: Parameters<ChannelRepository['findAll']>[0]): Promise<Channels> {
    const { id, title, group, gender, country } = where || {}
    const channels = await this.prismaInfraService.channel.findMany({
      where: {
        id: { in: id?.map(e => e.get()) },
        title: { contains: title?.get(), mode: 'insensitive' },
        group: group?.get(),
        gender: gender?.get(),
        country: country?.get()
      },
      orderBy,
      take: limit,
      skip: offset
    })
    return new Channels(
      channels.map(channel => {
        return this.toDomain(channel)
      })
    )
  }

  count: ChannelRepository['count'] = async ({ where }) => {
    const { group, gender, country } = where || {}
    return await this.prismaInfraService.channel.count({
      where: {
        group: group?.get(),
        gender: gender?.get(),
        country: country?.get()
      }
    })
  }

  async findById(
    id: Parameters<ChannelRepository['findById']>[0]
  ): Promise<Channel | null> {
    const channel = await this.prismaInfraService.channel.findUnique({
      where: { id: id.get() }
    })
    if (!channel) return null
    return this.toDomain(channel)
  }

  bulkCreate: ChannelRepository['bulkCreate'] = async ({ data: channels }) => {
    await this.prismaInfraService.channel.createMany({
      data: channels.map(channel => this.toPrisma(channel))
    })
  }

  async bulkUpdate({
    data: channels
  }: Parameters<ChannelRepository['bulkUpdate']>[0]) {
    const prismaData: (Prisma.ChannelUpdateArgs['data'] & { id: string })[] =
      channels.map(channel => {
        const {
          basicInfo: { id, title, description, thumbnails, publishedAt },
          contentDetails,
          statistics: { viewCount, subscriberCount, videoCount },
          brandingSettings: { keywords }
        } = channel

        return {
          id: id.get(),
          title,
          description,
          thumbnails,
          publishedAt,
          playlistId: contentDetails.uploadsPlaylistId,
          viewCount,
          subscriberCount,
          videoCount,
          keywords: keywords.map(k => k.get())
        }
      })

    const query = prismaData.map(channel =>
      this.prismaInfraService.channel.update({
        where: { id: channel.id },
        data: channel
      })
    )

    await this.prismaInfraService.$transaction([...query])
  }

  private toPrisma(channel: Channel) {
    const {
      basicInfo: { id, title, description, thumbnails, publishedAt },
      contentDetails,
      statistics: { viewCount, subscriberCount, videoCount },
      brandingSettings: { keywords },
      peakX: { group, country, defaultLanguage, gender } = {}
    } = channel

    if (!group) {
      throw new UnprocessableEntityException('Group is required')
    }
    if (!country) {
      throw new UnprocessableEntityException('Country is required')
    }
    if (!defaultLanguage) {
      throw new UnprocessableEntityException('Default language is required')
    }
    if (!gender) {
      throw new UnprocessableEntityException('Gender is required')
    }

    return {
      id: id.get(),
      title,
      description,
      thumbnails,
      publishedAt,
      playlistId: contentDetails.uploadsPlaylistId,
      viewCount,
      subscriberCount,
      videoCount,
      keywords: keywords.map(k => k.get()),
      // VCharts defines
      // * group
      // * country code
      // * defaultLanguage
      // * gender
      group: group.get(),
      country: country.get(),
      defaultLanguage: defaultLanguage.get(),
      gender: gender.get()
    }
  }

  private toDomain(row: PrismaChannel) {
    const {
      id,
      title,
      description,
      thumbnails,
      publishedAt,
      defaultLanguage,
      playlistId,
      viewCount,
      subscriberCount,
      videoCount,
      keywords,
      country,
      gender
    } = row
    return new Channel({
      basicInfo: new ChannelBasicInfo({
        id: new ChannelId(id),
        title,
        description,
        thumbnails,
        publishedAt: publishedAt
      }),
      contentDetails: new ContentDetails({
        relatedPlaylists: { uploads: playlistId }
      }),
      statistics: new ChannelStatistics({
        viewCount,
        subscriberCount,
        videoCount
      }),
      brandingSettings: new BrandingSettings({
        keywords: new Keywords(keywords.map(k => new Keyword(k)))
      }),
      peakX: new PeakXChannelProps({
        group: new GroupId(row.group),
        country: new CountryCode(country),
        defaultLanguage: defaultLanguage
          ? new LanguageTag(defaultLanguage)
          : undefined,
        gender: new Gender(gender)
      })
    })
  }
}
