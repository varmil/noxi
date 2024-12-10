import { Transform } from 'class-transformer'
import { CountryCode, LanguageTag } from '@domain/country'
import type { Group } from '@domain/group'
import { Gender } from '@domain/lib'

export class PeakXChannelProps {
  @Transform(({ value }: { value: Group }) => value.get())
  public readonly group: Group
  @Transform(({ value }: { value: CountryCode }) => value.get())
  public readonly country: CountryCode
  /** 本当はNOT NULLでいけるが実装までOptional */
  @Transform(({ value }: { value: LanguageTag }) => value?.get())
  public readonly defaultLanguage?: LanguageTag
  @Transform(({ value }: { value: Gender }) => value.get())
  public readonly gender: Gender

  constructor(args: {
    group: Group
    country: CountryCode
    defaultLanguage?: LanguageTag
    gender: Gender
  }) {
    this.group = args.group
    this.country = args.country
    this.defaultLanguage = args.defaultLanguage
    this.gender = args.gender
  }
}
