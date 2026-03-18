import { IsNotEmpty, IsString } from 'class-validator'
import { ChannelId } from '@domain/youtube/channel'

export class GetSubscriberRankTrendDto {
  @IsNotEmpty()
  @IsString()
  channelId!: string

  toChannelId(): ChannelId {
    return new ChannelId(this.channelId)
  }

  toSince(): Date {
    const now = new Date()
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    const year = jstNow.getUTCFullYear()
    const month = jstNow.getUTCMonth()
    const day = jstNow.getUTCDate()
    // 1年前の JST 00:00:00 を UTC に変換
    return new Date(Date.UTC(year - 1, month, day, -9))
  }
}
