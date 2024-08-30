import { Type } from 'class-transformer'
import {
  IsInt,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsOptional,
  IsRFC3339
} from 'class-validator'
import { CountryCode } from '@domain/country'
import { ChannelId, Q, RelevanceLanguage } from '@domain/youtube'
import { type SearchVideosParams } from '@infra/service/youtube-data-api'

export class SearchVideosDto {
  @IsNotEmpty()
  q: string

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  limit: number

  @IsOptional()
  order?: SearchVideosParams['order']

  @IsOptional()
  @IsRFC3339()
  publishedBefore?: string

  @IsOptional()
  @IsRFC3339()
  publishedAfter?: string

  @IsOptional()
  channelId?: string

  @IsOptional()
  @IsISO31661Alpha2()
  country?: string

  @IsOptional()
  language?: string

  toQ = () => new Q(this.q)

  toPublishedBefore = () =>
    this.publishedBefore ? new Date(this.publishedBefore) : undefined

  toPublishedAfter = () =>
    this.publishedAfter ? new Date(this.publishedAfter) : undefined

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

  toCountryCode = () =>
    this.country ? new CountryCode(this.country) : undefined

  toRelevanceLanguage = () =>
    this.language ? new RelevanceLanguage(this.language) : undefined
}
