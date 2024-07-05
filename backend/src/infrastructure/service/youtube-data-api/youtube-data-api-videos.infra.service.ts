import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { Thumbnails } from '@domain/youtube/image/Thumbnail'
import { LiveStreamingDetails } from '@domain/youtube/video/LiveStreamingDetails'
import { Snippet } from '@domain/youtube/video/Snippet'
import { Statistics } from '@domain/youtube/video/Statistics'
import { Video } from '@domain/youtube/video/Video.entity'
import { Videos } from '@domain/youtube/video/Videos.collection'

// /search の型定義
interface DataAPISearch {
  id: {
    videoId: string
  }
}

// /videos の型定義
interface DataAPIVideo {
  id: string
  snippet: {
    publishedAt: string // ISO 8601
    channelId: string
    title: string
    description: string
    thumbnails: Thumbnails
    tags?: string[]
    categoryId: string
    liveBroadcastContent: string
  }
  statistics: {
    viewCount?: string
    likeCount?: string
    commentCount?: string
  }
  liveStreamingDetails?: {
    actualStartTime: string // ISO 8601
    actualEndTime: string // ISO 8601
  }
}
const PER_PAGE = 50 // 50

/**
 * This class uses...
 * GET https://www.googleapis.com/youtube/v3/search
 * for videos in the channel
 *
 * and
 *
 * GET https://www.googleapis.com/youtube/v3/videos
 * for statistics
 */
@Injectable()
export class YoutubeDataApiVideosInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY

  constructor() {}

  async getVideos(
    channelId: string,
    { limit }: { limit: number }
  ): Promise<Videos> {
    const videos = await this._getVideos(channelId, { limit })
    return new Videos(
      videos.map(
        v =>
          new Video({
            id: v.id,
            snippet: new Snippet({
              ...v.snippet,
              publishedAt: new Date(v.snippet.publishedAt)
            }),
            statistics: new Statistics(v.statistics),
            liveStreamingDetails: v.liveStreamingDetails
              ? new LiveStreamingDetails({
                  actualStartTime: new Date(
                    v.liveStreamingDetails.actualStartTime
                  ),
                  actualEndTime: new Date(v.liveStreamingDetails.actualEndTime)
                })
              : undefined
          })
      )
    )
  }

  // YouTubeチャンネルの動画情報を取得する関数
  private async _getVideos(
    channelId: string,
    { limit }: { limit: number }
  ): Promise<DataAPIVideo[]> {
    let videos: DataAPIVideo[] = []
    let nextPageToken = ''
    let count = 0

    do {
      const response = await axios.get<{
        items: DataAPISearch[]
        nextPageToken: string
      }>('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          type: 'video',
          channelId: channelId,
          maxResults: PER_PAGE,
          order: 'date',
          pageToken: nextPageToken,
          key: this.API_KEY
        }
      })

      const videoIds = response.data.items.map(item => item.id.videoId)
      if (videoIds.length === 0) break

      const videoDetailsResponse = await axios.get<{
        items: DataAPIVideo[]
      }>('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,statistics,liveStreamingDetails',
          id: videoIds.join(','),
          key: this.API_KEY
        }
      })

      console.log(
        'videoDetailsResponse.items.tags:',
        videoDetailsResponse.data.items
          .map(i => i.snippet.tags)
          .filter(i => i === undefined).length
      )

      videos = videos.concat(videoDetailsResponse.data.items)
      nextPageToken = response.data.nextPageToken
      count += videoDetailsResponse.data.items.length
    } while (nextPageToken && count < limit)

    return videos
  }
}
