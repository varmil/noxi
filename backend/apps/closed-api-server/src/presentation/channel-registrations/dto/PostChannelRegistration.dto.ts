import { Type } from 'class-transformer'
import {
  IsIn,
  IsInt,
  IsISO31661Alpha2,
  IsLocale,
  IsRFC3339,
  IsString
} from 'class-validator'
import { AppliedAt, Status } from '@domain/channel-registration'
import { CountryCode, LanguageTag } from '@domain/country'
import { GroupName } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'
import {
  ChannelId,
  ChannelTitle,
  LiveStreamCount,
  SubscriberCount
} from '@domain/youtube'

export class PostChannelRegistration {
  @IsString()
  channelId: string

  @IsString()
  title: string

  @IsString()
  @IsISO31661Alpha2()
  country: string

  @IsString()
  @IsLocale()
  language: string

  @IsIn(GenderStrings)
  gender: GenderString

  @IsString()
  group: string

  @IsInt()
  @Type(() => Number)
  subscriberCount: number

  @IsInt()
  @Type(() => Number)
  liveStreamCount: number

  @IsString()
  @IsRFC3339()
  appliedAt: string

  toChannelId = () => new ChannelId(this.channelId)

  toTitle = () => new ChannelTitle(this.title)

  toCountry = () => new CountryCode(this.country)

  toDefaultLanguage = () => new LanguageTag(this.language)

  toGender = () => new Gender(this.gender)

  toGroup = () => new GroupName(this.group)

  toSubscriberCount = () => new SubscriberCount(this.subscriberCount)

  toLiveStreamCount = () => new LiveStreamCount(this.liveStreamCount)

  toAppliedAt = () => new AppliedAt(new Date(this.appliedAt))

  toStatus = () => new Status('pending')
}
