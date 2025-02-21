import { IsIn, IsOptional, IsRFC3339, IsString } from 'class-validator'
import { Now } from '@domain'
import { ChannelId } from '@domain/youtube'

export class GetSupersBundlesSum {
  @IsString()
  channelId: string

  @IsString()
  @IsIn(['last24Hours'])
  period: 'last24Hours'

  @IsOptional()
  @IsRFC3339()
  createdAtLTE?: string

  @IsRFC3339()
  createdAtGTE: string

  toChannelId = () => new ChannelId(this.channelId)

  toCreatedAt = () => {
    const createdAtLTE = this.createdAtLTE
      ? new Date(this.createdAtLTE)
      : undefined

    return {
      gte: new Date(this.createdAtGTE),
      ...(createdAtLTE && { lte: createdAtLTE })
    }
  }
}
