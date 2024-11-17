import { Exclude, Transform } from 'class-transformer'
import { ExchangeRates } from '@domain/exchange-rate'
import { Group } from '@domain/group'
import { PublishedAt, VideoId } from '@domain/youtube'
import { LiveChatMessageId } from '@domain/youtube/live-chat-message'
import { Currency } from '../../lib/currency/Currency.vo'
import { AmountDisplayString } from './AmountDisplayString.vo'
import { AmountMicros } from './AmountMicros.vo'
import { Author } from './author/Author'

export class Supers {
  @Transform(({ value }: { value: LiveChatMessageId }) => value.get())
  public readonly id: LiveChatMessageId
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly amountMicros: AmountMicros
  @Transform(({ value }: { value: Currency }) => value.get())
  public readonly currency: Currency
  @Transform(({ value }: { value: AmountDisplayString }) => value.get())
  public readonly amountDisplayString: AmountDisplayString

  public readonly author: Author

  @Transform(({ value }: { value: VideoId }) => value.get())
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
    author: Author
    videoId: VideoId
    group: Group
    createdAt: PublishedAt
  }) {
    this.id = args.id
    this.amountMicros = args.amountMicros
    this.currency = args.currency
    this.amountDisplayString = args.amountDisplayString
    this.author = args.author
    this.videoId = args.videoId
    this.group = args.group
    this.createdAt = args.createdAt
  }

  convertToJPY(er: ExchangeRates): AmountMicros {
    if (this.currency.equals(Currency.JPY)) return this.amountMicros
    const rate = er.getRate(this.currency)
    return this.amountMicros.div(rate.get())
  }
}
