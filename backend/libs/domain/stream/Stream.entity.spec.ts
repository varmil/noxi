import { GroupName } from '@domain/group'
import { Metrics } from '@domain/stream/Metrics'
import { StreamTimes } from '@domain/stream/StreamTimes'
import {
  ActualEndTime,
  ActualStartTime,
  ChannelId,
  Duration,
  PublishedAt,
  UpdatedAt,
  VideoId,
  VideoTitle
} from '@domain/youtube'
import { Stream } from './Stream.entity'

const stream = new Stream({
  videoId: new VideoId('1'),
  snippet: {
    publishedAt: new PublishedAt(new Date()),
    channelId: new ChannelId('1'),
    title: new VideoTitle('test'),
    thumbnails: {
      default: {
        url: 'test'
      }
    },
    tags: [],
    categoryId: 1
  },
  duration: new Duration('PT15M33S'),
  streamTimes: new StreamTimes({
    scheduledStartTime: new Date(),
    actualStartTime: new ActualStartTime(new Date()),
    actualEndTime: new ActualEndTime(new Date())
  }),
  metrics: new Metrics({
    peakConcurrentViewers: 0,
    avgConcurrentViewers: 0,
    chatMessages: 0,
    views: 0,
    likes: 0
  }),
  group: new GroupName('hololive'),
  updatedAt: new UpdatedAt(new Date())
})

const NotMembersOnlyStreams = [
  `【HOLOBAGS】Inspecting Hololive Members Bags Once AGAIN! #kfp #キアライブ`,
  `【＃ホロメン私物オークション】開催！ホロメンの私物を落札せよ！【ホロライブ/兎田ぺこら/大神ミオ】`
].map(
  title =>
    new Stream({
      ...stream,
      snippet: { ...stream.snippet, title: new VideoTitle(title) }
    })
)

const MembersOnlyStreams = [
  `"You've had a long day, haven't you?" | Members-Only ASMR`,
  `【Members Only】I wanna learn songs!!!`,
  `【MEMBER STREAM】attempting to make an emote!`,
  `Members Only - The Influencer Watchalong! (Netflix Korean Reality Show) 5-END`,
  `【Membership】it's time for quality time【holoID】`,
  `【メンバー限定】ASMRマイク使って、お片付け＆ざーつだんっ💛【Memberships only】`,
  `【メンバー限定配信】開設4年7ヶ月目！「アルマゲドン / Armageddon」同時視聴！【角巻わため/ホロライブ４期生】`,
  `【 メン限 】15話～ むしろ今、進撃の巨人を1から同時視聴！【ホロライブ/沙花叉クロヱ】`
].map(
  title =>
    new Stream({
      ...stream,
      snippet: { ...stream.snippet, title: new VideoTitle(title) }
    })
)

describe('StreamEntity', () => {
  describe('memberOnly()', () => {
    it.each(NotMembersOnlyStreams)(
      'should be false when title does not contains "members only" string',
      stream => {
        expect(stream.membersOnly).toBe(false)
      }
    )

    it.each(MembersOnlyStreams)(
      'should be true when title contains "members only" string',
      stream => {
        expect(stream.membersOnly).toBe(true)
      }
    )
  })
})
