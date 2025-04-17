import { ChatCount } from '@domain/stream-stats/chat/ChatCount.entity'
import { ChatCounts } from '@domain/stream-stats/chat/ChatCounts.collection'
import { PublishedAt } from '../../youtube/datetime'
import { VideoId } from '../../youtube/video/VideoId'

const videoId = new VideoId('ky_EP0NHH0A')
const latestPublishedAt = new PublishedAt(new Date())

export const ChatCountsFixture = new ChatCounts([
  new ChatCount({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:50:16.441Z')
  }),
  new ChatCount({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:50:33.708Z')
  }),
  new ChatCount({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:50:49.136Z')
  }),
  new ChatCount({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:04.563Z')
  }),
  new ChatCount({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:20.523Z')
  }),
  new ChatCount({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:36.861Z')
  }),
  new ChatCount({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:52.293Z')
  }),
  new ChatCount({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:52:07.630Z')
  }),
  new ChatCount({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:52:55.484Z')
  }),
  new ChatCount({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:53:13.071Z')
  })
])
