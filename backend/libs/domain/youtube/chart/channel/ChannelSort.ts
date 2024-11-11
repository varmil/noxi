import { IsOptional, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

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
   * Prisma uses this value
   */
  toOrderBy() {
    switch (this.val) {
      default:
      case 'subscribers':
        return 'subscriberCount'

      case 'avarage-views':
        return 'viewCount' // TODO:

      case 'views':
        return 'viewCount'
    }
  }
}
