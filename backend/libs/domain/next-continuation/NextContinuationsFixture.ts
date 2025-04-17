import { VideoId, PublishedAt } from '@domain/youtube'
import { NextContinuation } from './NextContinuation.entity'
import { NextContinuations } from './NextContinuations.collection'

const videoId = new VideoId('ky_EP0NHH0A')
const latestPublishedAt = new PublishedAt(new Date())

export const NextContinuationsFixture = new NextContinuations([
  new NextContinuation({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:50:16.441Z')
  }),
  new NextContinuation({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:50:33.708Z')
  }),
  new NextContinuation({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:50:49.136Z')
  }),
  new NextContinuation({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:04.563Z')
  }),
  new NextContinuation({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:20.523Z')
  }),
  new NextContinuation({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:36.861Z')
  }),
  new NextContinuation({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:51:52.293Z')
  }),
  new NextContinuation({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:52:07.630Z')
  }),
  new NextContinuation({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:52:55.484Z')
  }),
  new NextContinuation({
    videoId,
    latestPublishedAt,
    createdAt: new Date('2024-09-28T03:53:13.071Z')
  })
])
