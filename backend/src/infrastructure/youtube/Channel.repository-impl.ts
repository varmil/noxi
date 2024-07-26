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
  private readonly COLLECTION_NAME = 'channel'

  constructor() {}

  async findAll({
    sort,
    country,
    limit
  }: Parameters<ChannelRepository['findAll']>[0]): Promise<Channels> {
    const channels = await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      // FIXME: use subcollection
      .where('brandingSettings.country', '==', country.get())
      .limit(limit)
      .orderBy(sort.toOrderBy(), 'desc')
      .withConverter(channelConverter)
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
    const doc = await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(id.get())
      .withConverter(channelConverter)
      .get()

    const data = doc.data()
    if (!data) return null

    return this.toDomain(data)
  }

  // upsert with channel id
  async save(channel: Parameters<ChannelRepository['save']>[0]) {
    const {
      basicInfo: { id, title, description, thumbnails, publishedAt },
      contentDetails,
      statistics,
      brandingSettings
    } = channel
    await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(id)
      .withConverter(channelConverter)
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
            keywords: brandingSettings.keywords.map(k => k.get()),
            country: brandingSettings.country.get()
          },

          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          expireAt: getExpireAt()
        },
        { merge: true }
      )
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
