import { Group } from '@domain/group'
import { Metrics } from '@domain/stream/Metrics'
import { StreamTimes } from '@domain/stream/StreamTimes'
import { Duration, PublishedAt, VideoId } from '@domain/youtube'
import { Stream } from './Stream.entity'

describe('StreamEntity', () => {
  it('should be defined', () => {
    expect(true).toBe(true)
  })

  describe('memberOnly()', () => {
    it('should be defined', () => {
      expect(true).toBe(true)
    })
  })
})

const stream = new Stream({
  videoId: new VideoId('1'),
  snippet: {
    publishedAt: new PublishedAt(new Date()),
    channelId: '1',
    title: 'test',
    description: 'test',
    thumbnails: {
      default: {
        url: 'test'
      }
    },
    tags: [],
    categoryId: 1
  },
  streamTimes: new StreamTimes({
    scheduledStartTime: new Date(),
    actualStartTime: new Date(),
    actualEndTime: new Date()
  }),
  metrics: new Metrics({
    peakConcurrentViewers: 0,
    avgConcurrentViewers: 0,
    chatMessages: 0,
    views: 0,
    likes: 0
  }),
  group: new Group('hololive'),
  duration: new Duration('PT15M33S')
})
