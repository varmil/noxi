import { Transform } from 'class-transformer'
import { CountryCode } from '@domain/country'
import type { GroupId } from '@domain/group'
import { Gender } from '@domain/lib'

export class PeakXChannelProps {
  @Transform(({ value }: { value: GroupId }) => value.get())
  public readonly group: GroupId
  @Transform(({ value }: { value: CountryCode }) => value.get())
  public readonly country: CountryCode
  @Transform(({ value }: { value: Gender }) => value.get())
  public readonly gender: Gender

  constructor(args: { group: GroupId; country: CountryCode; gender: Gender }) {
    this.group = args.group
    this.country = args.country
    this.gender = args.gender
  }
}
