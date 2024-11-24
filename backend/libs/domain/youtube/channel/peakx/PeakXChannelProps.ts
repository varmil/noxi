import { Transform } from 'class-transformer'
import { CountryCode, LanguageTag } from '@domain/country'
import { Gender } from '@domain/lib'

export class PeakXChannelProps {
  @Transform(({ value }: { value: CountryCode }) => value.get())
  public readonly country: CountryCode
  /** 本当はNOT NULLでいけるが実装までOptional */
  @Transform(({ value }: { value: LanguageTag }) => value?.get())
  public readonly defaultLanguage?: LanguageTag
  @Transform(({ value }: { value: Gender }) => value?.get())
  public readonly gender?: Gender

  constructor(args: {
    country: CountryCode
    defaultLanguage?: LanguageTag
    gender?: Gender
  }) {
    this.country = args.country
    this.defaultLanguage = args.defaultLanguage
    this.gender = args.gender
  }
}
