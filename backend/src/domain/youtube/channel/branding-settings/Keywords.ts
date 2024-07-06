import { Exclude } from 'class-transformer'
import { ArrayMaxSize } from 'class-validator'
import { Keyword } from '@domain/youtube/channel/branding-settings/Keyword'

const MAX_LENGTH = 20

/**
 * MAX LENGTH = 20
 */
export class Keywords {
  @ArrayMaxSize(MAX_LENGTH)
  private readonly list: Keyword[]

  constructor(list: Keyword[]) {
    this.list = list
  }

  /**
   * @param val 'AAA BBB CCC DDD'
   */
  @Exclude()
  static fromString(val: string) {
    return new Keywords(
      val
        .split(' ')
        .filter(str => Keyword.isValidLength(str))
        .map(str => new Keyword(str))
        .slice(0, MAX_LENGTH)
    )
  }

  @Exclude()
  map = <U>(
    callbackfn: (value: Keyword, index: number, array: Keyword[]) => U
  ): U[] => this.list.map(callbackfn)

  @Exclude()
  first = () => this.list[0]

  @Exclude()
  take = (n: number) => this.list.slice(0, n)
}
