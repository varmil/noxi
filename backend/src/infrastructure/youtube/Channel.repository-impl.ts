import { Injectable } from '@nestjs/common'
import admin from 'firebase-admin'
import { CountryCode } from '@domain/country'
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

@Injectable()
export class ChannelRepositoryImpl implements ChannelRepository {
  private readonly ROOT_COLLECTION_NAME = 'youtube'
  private readonly SUB_COLLECTION_NAME = 'yt:channel'

  constructor() {}

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

  // upsert with channel id
  async save(channel: Parameters<ChannelRepository['save']>[0]) {
    const {
      basicInfo: { id, title, description, thumbnails, publishedAt },
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
            publishedAt: admin.firestore.Timestamp.fromDate(publishedAt)
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
    const { basicInfo, contentDetails, statistics, brandingSettings } = doc
    return new Channel({
      basicInfo: new ChannelBasicInfo({
        ...basicInfo,
        publishedAt: basicInfo.publishedAt.toDate()
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
