import { ChatCount } from '@domain/stream-stats/chat/ChatCount.entity'
import { ChatCounts } from '@domain/stream-stats/chat/ChatCounts.collection'
import { Count } from '@domain/stream-stats/count'
import { PublishedAt } from '../../youtube/datetime'
import { VideoId } from '../../youtube/video/VideoId'

const videoId = new VideoId('ky_EP0NHH0A')
const latestPublishedAt = new PublishedAt(new Date())

export const ChatCountsFixture = new ChatCounts([
  new ChatCount({
    videoId,
    all: new Count(7),
    member: new Count(4),
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:50:16.441Z')
  }),
  new ChatCount({
    videoId,
    all: new Count(4),
    member: new Count(2),
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:50:33.708Z')
  }),
  new ChatCount({
    videoId,
    all: new Count(1),
    member: new Count(1),
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:50:49.136Z')
  }),
  new ChatCount({
    videoId,
    all: new Count(3),
    member: new Count(2),
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:04.563Z')
  }),
  new ChatCount({
    videoId,
    all: new Count(0),
    member: new Count(0),
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:20.523Z')
  }),
  new ChatCount({
    videoId,
    all: new Count(2),
    member: new Count(1),
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:36.861Z')
  }),
  new ChatCount({
    videoId,
    all: new Count(2),
    member: new Count(2),
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:52.293Z')
  }),
  new ChatCount({
    videoId,
    all: new Count(2),
    member: new Count(2),
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:52:07.630Z')
  }),
  new ChatCount({
    videoId,
    all: new Count(4),
    member: new Count(2),
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:52:55.484Z')
  }),
  new ChatCount({
    videoId,
    all: new Count(3),
    member: new Count(2),
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:53:13.071Z')
  })
])
