import { Exclude, Transform } from 'class-transformer'
import { AppliedAt, Status } from '@domain/channel-registration'
import { CountryCode, LanguageTag } from '@domain/country'
import { GroupName } from '@domain/group'
import { Gender } from '@domain/lib'
import {
  ChannelId,
  ChannelTitle,
  LiveStreamCount,
  SubscriberCount
} from '@domain/youtube'

export class ChannelRegistration {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: ChannelTitle }) => value.get())
  public readonly title: ChannelTitle
  @Transform(({ value }: { value: CountryCode }) => value.get())
  public readonly country: CountryCode
  @Transform(({ value }: { value: LanguageTag }) => value.get())
  public readonly defaultLanguage: LanguageTag
  @Transform(({ value }: { value: Gender }) => value.get())
  public readonly gender: Gender
  @Transform(({ value }: { value: GroupName }) => value.get())
  public readonly group: GroupName
  @Transform(({ value }: { value: SubscriberCount }) => value.get())
  public readonly subscriberCount: SubscriberCount
  @Transform(({ value }: { value: LiveStreamCount }) => value.get())
  public readonly liveStreamCount: LiveStreamCount
  @Transform(({ value }: { value: Status }) => value.get())
  public readonly status: Status
  @Transform(({ value }: { value: AppliedAt }) => value.get())
  public readonly appliedAt: AppliedAt

  constructor(args: {
    channelId: ChannelId
    title: ChannelTitle
    country: CountryCode
    defaultLanguage: LanguageTag
    gender: Gender
    group: GroupName
    subscriberCount: SubscriberCount
    liveStreamCount: LiveStreamCount
    status: Status
    appliedAt: AppliedAt
  }) {
    this.channelId = args.channelId
    this.title = args.title
    this.country = args.country
    this.defaultLanguage = args.defaultLanguage
    this.gender = args.gender
    this.group = args.group
    this.subscriberCount = args.subscriberCount
    this.liveStreamCount = args.liveStreamCount
    this.status = args.status
    this.appliedAt = args.appliedAt
  }

  @Exclude()
  isApproved(): boolean {
    return this.status.get() === 'approved'
  }

  @Exclude()
  isPending(): boolean {
    return this.status.get() === 'pending'
  }

  @Exclude()
  isDone(): boolean {
    return this.status.get() === 'done'
  }

  @Exclude()
  isRejected(): boolean {
    return this.status.get() === 'rejected'
  }
}
