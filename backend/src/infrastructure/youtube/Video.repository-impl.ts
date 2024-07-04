import { Injectable, NotImplementedException } from '@nestjs/common'
import admin from 'firebase-admin'
import { Snippet } from '@domain/youtube/video/Snippet'
import { Statistics } from '@domain/youtube/video/Statistics'
import { Video } from '@domain/youtube/video/Video.entity'
import { VideoRepository } from '@domain/youtube/video/Video.repository'
import { Videos } from '@domain/youtube/video/Videos.collection'
import { videoConverter } from '@infra/schema/VideoSchema'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'

@Injectable()
export class VideoRepositoryImpl implements VideoRepository {
  private readonly COLLECTION_NAME = 'video'

  constructor(
    private youtubeDataApiSearchInfraService: YoutubeDataApiSearchInfraService
  ) {}

  async findAll({ limit = 1000 }: { limit?: number }) {
    const videos = await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .limit(limit)
      .withConverter(videoConverter)
      .get()

    return new Videos(
      videos.docs.map(doc => {
        const {
          id,
          snippet: {
            publishedAt,
            channelId,
            title,
            description,
            thumbnails,
            tags,
            categoryId
          },
          statistics: { viewCount, likeCount, commentCount }
        } = doc.data()
        return new Video({
          id,
          snippet: new Snippet({
            publishedAt: publishedAt.toDate(),
            channelId,
            title,
            description,
            thumbnails,
            tags,
            categoryId
          }),
          statistics: new Statistics({ viewCount, likeCount, commentCount })
        })
      })
    )
  }

  // upsert with video id
  async save(video: Video) {
    const {
      id,
      snippet: {
        publishedAt,
        channelId,
        title,
        description,
        thumbnails,
        tags,
        categoryId
      },
      statistics
    } = video
    await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(id)
      .withConverter(videoConverter)
      .set({
        id,
        snippet: {
          publishedAt: admin.firestore.Timestamp.fromDate(publishedAt),
          channelId,
          title,
          description,
          thumbnails,
          tags,
          categoryId
        },
        statistics,

        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })
  }

  async findOne() {
    throw new NotImplementedException()
  }
}
