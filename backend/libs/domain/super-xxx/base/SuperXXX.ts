import { Group } from '@domain/group'
import { VideoId } from '@domain/youtube'
import { AmountDisplayString } from './AmountDisplayString.vo'
import { AmountMicros } from './AmountMicros.vo'
import { Currency } from './Currency.vo'
import { Tier } from './Tier.vo'
import { Author } from './author/Author'

export class SuperXXX {
  public readonly videoId: VideoId
  public readonly group: Group

  public readonly amountMicros: AmountMicros
  public readonly currency: Currency
  public readonly amountDisplayString: AmountDisplayString
  public readonly tier: Tier

  public readonly author: Author

  constructor(args: {
    videoId: VideoId
    group: Group
    amountMicros: AmountMicros
    currency: Currency
    amountDisplayString: AmountDisplayString
    tier: Tier
    author: Author
  }) {
    this.videoId = args.videoId
    this.group = args.group
    this.amountMicros = args.amountMicros
    this.currency = args.currency
    this.amountDisplayString = args.amountDisplayString
    this.tier = args.tier
    this.author = args.author
  }
}
