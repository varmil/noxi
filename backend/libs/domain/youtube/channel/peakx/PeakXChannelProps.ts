import { Transform } from 'class-transformer'
import { CountryCode, LanguageTag } from '@domain/country'
import { Gender } from '@domain/lib'
import type { Group } from '@domain/group'

export class PeakXChannelProps {
  @Transform(({ value }: { value: CountryCode }) => value.get())
  public readonly country: CountryCode
  /** 本当はNOT NULLでいけるが実装までOptional */
  @Transform(({ value }: { value: LanguageTag }) => value?.get())
  public readonly defaultLanguage?: LanguageTag
  @Transform(({ value }: { value: Gender }) => value?.get())
  public readonly gender?: Gender
  @Transform(({ value }: { value: Group }) => value.get())
  public readonly group: Group

  constructor(args: {
    country: CountryCode
    defaultLanguage?: LanguageTag
    gender?: Gender
    group: Group
  }) {
    this.country = args.country
    this.defaultLanguage = args.defaultLanguage
    this.gender = args.gender
    this.group = args.group
  }
}
