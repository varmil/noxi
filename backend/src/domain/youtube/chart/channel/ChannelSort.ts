import { IsOptional, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

/**
 * Default: subscribers
 */
export class ChannelSort extends StringValueObject {
  @IsOptional()
  @IsString()
  protected readonly val: string

  constructor(val = 'subscribers') {
    super(val)
    this.val = val
  }

  /**
   * Firestore uses this value
   */
  toOrderBy() {
    switch (this.val) {
      default:
      case 'subscribers':
        return 'statistics.subscriberCount'

      case 'avarage-views':
        return 'latestVideoAggregation.regular.averageViews'

      case 'views':
        return 'statistics.viewCount'
    }
  }
}
