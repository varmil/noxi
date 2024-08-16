import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import admin from 'firebase-admin'
import { CountryCode, LanguageTag } from '@domain/country'
import { ChannelId, ChannelIds } from '@domain/youtube'
import { BrandingSettings } from '@domain/youtube/channel/BrandingSettings'
import { Channel } from '@domain/youtube/channel/Channel.entity'
import { ChannelRepository } from '@domain/youtube/channel/Channel.repository'
import { ChannelStatistics } from '@domain/youtube/channel/ChannelStatistics'
import { Channels } from '@domain/youtube/channel/Channels.collection'
import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'
import { Keyword } from '@domain/youtube/channel/branding-settings/Keyword'
import { Keywords } from '@domain/youtube/channel/branding-settings/Keywords'
import { ContentDetails } from '@domain/youtube/channel/content-details/ContentDetails'
import { getExpireAt } from '@infra/lib/getExpireAt'
import { channelConverter, ChannelSchema } from '@infra/schema/ChannelSchema'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import type { Channel as PrismaChannel } from '@prisma/client'

@Injectable()
export class ChannelRepositoryImpl implements ChannelRepository {
  private readonly ROOT_COLLECTION_NAME = 'youtube'
  private readonly SUB_COLLECTION_NAME = 'yt:channel'

  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    sort,
    where: { country },
    limit
  }: Parameters<ChannelRepository['findAll']>[0]): Promise<Channels> {
    const channels = await this.getQuery(country)
      .limit(limit)
      .orderBy(sort.toFirestoreOrderBy(), 'desc')
      .get()

    return new Channels(
      channels.docs.map(doc => {
        return this.firestoreToDomain(doc.data())
      })
    )
  }

  async prismaFindAll({
    where: { id, country },
    sort,
    limit
  }: Parameters<ChannelRepository['prismaFindAll']>[0]): Promise<Channels> {
    const orderBy = sort ? { [sort.toOrderBy()]: 'desc' } : undefined
    const channels = await this.prismaInfraService.channel.findMany({
      where: { id: { in: id?.map(e => e.get()) }, country: country?.get() },
      orderBy,
      take: limit
    })
    return new Channels(
      channels.map(channel => {
        return this.toDomain(channel)
      })
    )
  }

  // FIXME: ? see CountryRepositoryImpl.findAll select() だと動かないかも？
  async findIds({
    sort,
    where: { country },
    limit
  }: Parameters<ChannelRepository['findIds']>[0]) {
    const channels = await this.getQuery(country)
      .select()
      .limit(limit)
      .orderBy(sort.toFirestoreOrderBy(), 'desc')
      .get()

    return new ChannelIds(channels.docs.map(doc => new ChannelId(doc.id)))
  }

  async findById(
    id: Parameters<ChannelRepository['findById']>[0]
  ): Promise<Channel | null> {
    const snapshot = await admin
      .firestore()
      .collectionGroup(this.SUB_COLLECTION_NAME)
      .where('basicInfo.id', '==', id.get())
      .withConverter(channelConverter)
      .get()
    const first = snapshot.docs.at(0)
    if (!first) return null
    return this.firestoreToDomain(first.data())
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

  async save(channel: Parameters<ChannelRepository['save']>[0]) {
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
      statistics,
      brandingSettings: { keywords, country }
    } = channel
    await this.getQuery(country)
      .doc(id)
      .set(
        {
          basicInfo: {
            id,
            title,
            description,
            thumbnails,
            publishedAt: admin.firestore.Timestamp.fromDate(publishedAt),
            defaultLanguage: defaultLanguage?.get()
          },
          contentDetails: {
            relatedPlaylists: {
              uploads: contentDetails.uploadsPlaylistId
            }
          },
          statistics: {
            viewCount: statistics.viewCount,
            subscriberCount: statistics.subscriberCount,
            videoCount: statistics.videoCount
          },
          brandingSettings: {
            keywords: keywords.map(k => k.get()),
            country: country.get()
          },

          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          expireAt: getExpireAt()
        },
        { merge: true }
      )
  }

  async bulkSave(channels: Parameters<ChannelRepository['bulkSave']>[0]) {
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
        id,
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
        country: country.get()
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

    const label = Date.now() + 'channel.bulkSave'
    console.time(label)
    await this.prismaInfraService.$transaction([...query])
    console.timeEnd(label)
  }

  private getQuery(country: CountryCode) {
    return admin
      .firestore()
      .collection(this.ROOT_COLLECTION_NAME) // youtube >
      .doc(country.get()) // Country Code >
      .collection(this.SUB_COLLECTION_NAME) // yt:channel >
      .withConverter(channelConverter)
  }

  /** @deprecated */
  private firestoreToDomain(doc: ChannelSchema) {
    const {
      basicInfo: { publishedAt, defaultLanguage, ...bIrest },
      contentDetails,
      statistics,
      brandingSettings
    } = doc
    return new Channel({
      basicInfo: new ChannelBasicInfo({
        ...bIrest,
        publishedAt: publishedAt.toDate(),
        defaultLanguage: defaultLanguage
          ? new LanguageTag(defaultLanguage)
          : undefined
      }),
      contentDetails: new ContentDetails(contentDetails),
      statistics: new ChannelStatistics(statistics),
      brandingSettings: new BrandingSettings({
        keywords: new Keywords(
          brandingSettings.keywords.map(k => new Keyword(k))
        ),
        country: new CountryCode(brandingSettings.country)
      })
    })
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
        id,
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
