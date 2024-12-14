import { IsIn, IsString } from 'class-validator'
import { Now } from '@domain'
import { ChannelId } from '@domain/youtube'

export class GetSupersBundlesSum {
  @IsString()
  channelId: string

  @IsString()
  @IsIn(['last24Hours'])
  period: 'last24Hours'

  toChannelId = () => new ChannelId(this.channelId)

  // 現状24時間固定しかないのでベタ書き
  toActualEndTime = () => ({ gte: new Now().xDaysAgo(1) })

  // 現状24時間固定しかないのでベタ書き
  toCreatedAt = () => ({ gte: new Now().xDaysAgo(1) })
}
