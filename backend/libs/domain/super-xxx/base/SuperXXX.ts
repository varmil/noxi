import { Group } from '@domain/group'
import { VideoId } from '@domain/youtube'
import { LiveChatMessageId } from '@domain/youtube/live-chat-message'
import { AmountDisplayString } from './AmountDisplayString.vo'
import { AmountMicros } from './AmountMicros.vo'
import { Currency } from './Currency.vo'
import { Tier } from './Tier.vo'
import { Author } from './author/Author'

export class SuperXXX {
  public readonly id: LiveChatMessageId
  public readonly amountMicros: AmountMicros
  public readonly currency: Currency
  public readonly amountDisplayString: AmountDisplayString
  public readonly tier: Tier

  public readonly author: Author

  public readonly videoId: VideoId
  public readonly group: Group

  constructor(args: {
    id: LiveChatMessageId
    amountMicros: AmountMicros
    currency: Currency
    amountDisplayString: AmountDisplayString
    tier: Tier
    author: Author
    videoId: VideoId
    group: Group
  }) {
    this.id = args.id
    this.amountMicros = args.amountMicros
    this.currency = args.currency
    this.amountDisplayString = args.amountDisplayString
    this.tier = args.tier
    this.author = args.author
    this.videoId = args.videoId
    this.group = args.group
  }
}
