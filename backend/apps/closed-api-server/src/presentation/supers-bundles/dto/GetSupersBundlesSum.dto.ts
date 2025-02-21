import { IsIn, IsOptional, IsRFC3339, IsString } from 'class-validator'
import { ChannelId } from '@domain/youtube'

export class GetSupersBundlesSum {
  @IsString()
  channelId: string

  @IsString()
  @IsIn(['last24Hours'])
  period: 'last24Hours'

  @IsRFC3339()
  createdAfter: string

  @IsOptional()
  @IsRFC3339()
  createdBefore?: string

  toChannelId = () => new ChannelId(this.channelId)

  toCreatedAt = () => {
    const createdBefore = this.createdBefore
      ? new Date(this.createdBefore)
      : undefined

    return {
      gte: new Date(this.createdAfter),
      ...(createdBefore && { lte: createdBefore })
    }
  }
}
