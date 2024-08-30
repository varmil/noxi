import { Injectable, NotImplementedException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CountryCode, LanguageTag } from '@domain/country'
import { ChannelId } from '@domain/youtube'
import { BrandingSettings } from '@domain/youtube/channel/BrandingSettings'
import { Channel } from '@domain/youtube/channel/Channel.entity'
import { ChannelRepository } from '@domain/youtube/channel/Channel.repository'
import { ChannelStatistics } from '@domain/youtube/channel/ChannelStatistics'
import { Channels } from '@domain/youtube/channel/Channels.collection'
import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'
import { Keyword } from '@domain/youtube/channel/branding-settings/Keyword'
import { Keywords } from '@domain/youtube/channel/branding-settings/Keywords'
import { ContentDetails } from '@domain/youtube/channel/content-details/ContentDetails'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import type { Channel as PrismaChannel } from '@prisma/client'

@Injectable()
export class ChannelRepositoryImpl implements ChannelRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async prismaFindAll({
    where: { id, group, country },
    sort,
    limit
  }: Parameters<ChannelRepository['prismaFindAll']>[0]): Promise<Channels> {
    const orderBy = sort ? { [sort.toOrderBy()]: 'desc' } : undefined
    const channels = await this.prismaInfraService.channel.findMany({
      where: {
        id: { in: id?.map(e => e.get()) },
        group: group?.get(),
        country: country?.get()
      },
      orderBy,
      take: limit
    })
    return new Channels(
      channels.map(channel => {
        return this.toDomain(channel)
      })
    )
  }

  async prismaFindById(
    id: Parameters<ChannelRepository['prismaFindById']>[0]
  ): Promise<Channel | null> {
    const label = Date.now() + 'channel.prismaFindById'
    console.time(label)
    const channel = await this.prismaInfraService.channel.findUnique({
      where: { id: id.get() }
    })
    console.timeEnd(label)

    if (!channel) return null
    return this.toDomain(channel)
  }

  save: (args: Channel) => Promise<void> = () => {
    throw new NotImplementedException()
  }

  async bulkSave({
    data: { channels, group }
  }: Parameters<ChannelRepository['bulkSave']>[0]) {
    const prismaData: Prisma.ChannelCreateInput[] = channels.map(channel => {
      const {
        basicInfo: {
          id,
          title,
          description,
          thumbnails,
          publishedAt,
          defaultLanguage
        },
        contentDetails,
        statistics: { viewCount, subscriberCount, videoCount },
        brandingSettings: { keywords, country }
      } = channel

      return {
        id: id.get(),
        title,
        description,
        thumbnails,
        publishedAt,
        defaultLanguage: defaultLanguage?.get(),
        playlistId: contentDetails.uploadsPlaylistId,
        viewCount,
        subscriberCount,
        videoCount,
        keywords: keywords.map(k => k.get()),
        country: country.get(),
        group: group.get()
      }
    })

    const query = prismaData.map(channel =>
      this.prismaInfraService.channel.upsert({
        where: {
          id: channel.id
        },
        update: channel,
        create: channel
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
      country
    } = row
    return new Channel({
      basicInfo: new ChannelBasicInfo({
        id: new ChannelId(id),
        title,
        description,
        thumbnails,
        publishedAt: publishedAt,
        defaultLanguage: defaultLanguage
          ? new LanguageTag(defaultLanguage)
          : undefined
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
        keywords: new Keywords(keywords.map(k => new Keyword(k))),
        country: new CountryCode(country)
      })
    })
  }
}
