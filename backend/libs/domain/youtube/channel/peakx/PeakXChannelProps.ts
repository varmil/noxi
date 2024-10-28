import { Transform } from 'class-transformer'
import { CountryCode, LanguageTag } from '@domain/country'

export class PeakXChannelProps {
  @Transform(({ value }: { value: CountryCode }) => value.get())
  public readonly country: CountryCode

  /** 本当はNOT NULLでいけるが実装までOptional */
  @Transform(({ value }: { value: LanguageTag }) => value?.get())
  public readonly defaultLanguage?: LanguageTag

  constructor(args: { country: CountryCode; defaultLanguage?: LanguageTag }) {
    this.country = args.country
    this.defaultLanguage = args.defaultLanguage
  }
}
