import { IsIn, IsString } from 'class-validator'
import { ChannelId } from '@domain/youtube'
import { Now } from '@domain'

export class GetSupersBundlesSum {
  @IsString()
  channelId: string

  @IsString()
  @IsIn(['last24Hours'])
  period: 'last24Hours'

  toChannelId = () => new ChannelId(this.channelId)

  // 現状24時間固定しかないのでベタ書き
  toActualEndTime = () => ({ gte: new Now().xDaysAgo(1) })
}
