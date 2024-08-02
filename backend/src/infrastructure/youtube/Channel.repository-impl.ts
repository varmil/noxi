import { Injectable } from '@nestjs/common'
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
      .orderBy(sort.toOrderBy(), 'desc')
      .get()

    return new Channels(
      channels.docs.map(doc => {
        return this.toDomain(doc.data())
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
      .orderBy(sort.toOrderBy(), 'desc')
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
    return this.toDomain(first.data())
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

  private getQuery(country: CountryCode) {
    return admin
      .firestore()
      .collection(this.ROOT_COLLECTION_NAME) // youtube >
      .doc(country.get()) // Country Code >
      .collection(this.SUB_COLLECTION_NAME) // yt:channel >
      .withConverter(channelConverter)
  }

  private toDomain(doc: ChannelSchema) {
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
}
