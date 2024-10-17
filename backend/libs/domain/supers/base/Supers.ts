import { Exclude, Transform } from 'class-transformer'
import { Group } from '@domain/group'
import { PublishedAt, VideoId } from '@domain/youtube'
import { LiveChatMessageId } from '@domain/youtube/live-chat-message'
import { AmountDisplayString } from './AmountDisplayString.vo'
import { AmountMicros } from './AmountMicros.vo'
import { Currency } from './Currency.vo'
import { Tier } from './Tier.vo'
import { Author } from './author/Author'

export class Supers {
  @Exclude()
  public readonly id: LiveChatMessageId
  @Transform(({ value }: { value: AmountMicros }) => value.get())
  public readonly amountMicros: AmountMicros
  @Transform(({ value }: { value: Currency }) => value.get())
  public readonly currency: Currency
  @Transform(({ value }: { value: AmountDisplayString }) => value.get())
  public readonly amountDisplayString: AmountDisplayString
  @Transform(({ value }: { value: Tier }) => value.get())
  public readonly tier: Tier

  public readonly author: Author

  @Exclude()
  public readonly videoId: VideoId
  @Exclude()
  public readonly group: Group
  @Transform(({ value }: { value: PublishedAt }) => value.get())
  public readonly createdAt: PublishedAt

  constructor(args: {
    id: LiveChatMessageId
    amountMicros: AmountMicros
    currency: Currency
    amountDisplayString: AmountDisplayString
    tier: Tier
    author: Author
    videoId: VideoId
    group: Group
    createdAt: PublishedAt
  }) {
    this.id = args.id
    this.amountMicros = args.amountMicros
    this.currency = args.currency
    this.amountDisplayString = args.amountDisplayString
    this.tier = args.tier
    this.author = args.author
    this.videoId = args.videoId
    this.group = args.group
    this.createdAt = args.createdAt
  }
}
