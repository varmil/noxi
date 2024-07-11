import { Injectable } from '@nestjs/common'
import admin from 'firebase-admin'
import { Duration } from '@domain/youtube/video/Duration'
import { Snippet } from '@domain/youtube/video/Snippet'
import { Statistics } from '@domain/youtube/video/Statistics'
import { Video } from '@domain/youtube/video/Video.entity'
import { VideoRepository } from '@domain/youtube/video/Video.repository'
import { Videos } from '@domain/youtube/video/Videos.collection'
import { videoConverter } from '@infra/schema/VideoSchema'

@Injectable()
export class VideoRepositoryImpl implements VideoRepository {
  private readonly COLLECTION_NAME = 'video'

  constructor() {}

  async findAll({
    where: { channelId },
    limit = 1000
  }: Parameters<VideoRepository['findAll']>[0]) {
    const videos = await admin
      .firestore()
      .collection(this.COLLECTION_NAME)
      .where('snippet.channelId', '==', channelId)
      .limit(limit)
      .orderBy('snippet.publishedAt', 'desc')
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
          duration,
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
          duration: new Duration(duration),
          statistics: new Statistics({ viewCount, likeCount, commentCount })
        })
      })
    )
  }

  // upsert with video id
  async save(video: Parameters<VideoRepository['save']>[0]) {
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
      duration,
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
        duration: duration.get(),
        statistics,

        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })
  }
}
