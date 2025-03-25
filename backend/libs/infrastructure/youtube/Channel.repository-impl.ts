import { Injectable, NotImplementedException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { identity } from 'zx/build/util'
import { Gender, Group } from '@domain'
import { CountryCode, LanguageTag } from '@domain/country'
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
import type { Channel as PrismaChannel } from '@prisma/client'

@Injectable()
export class ChannelRepositoryImpl implements ChannelRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where,
    orderBy,
    limit,
    offset
  }: Parameters<ChannelRepository['findAll']>[0]): Promise<Channels> {
    const { id, group, gender, country } = where || {}
    const channels = await this.prismaInfraService.channel.findMany({
      where: {
        id: { in: id?.map(e => e.get()) },
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

  save: (args: Channel) => Promise<void> = () => {
    throw new NotImplementedException()
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
          // PeakX defines
          // * group
          // * country code
          // * defaultLanguage
          // * gender
          // group: group.get()
          // country: groupChannel.country.get(),
          // defaultLanguage: groupChannel.defaultLangage.get(),
          // gender: groupChannel.gender.get()
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
        group: new Group(row.group),
        country: new CountryCode(country),
        defaultLanguage: defaultLanguage
          ? new LanguageTag(defaultLanguage)
          : undefined,
        gender: new Gender(gender)
      })
    })
  }
}
