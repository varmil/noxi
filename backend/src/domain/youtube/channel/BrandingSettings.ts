import { Transform } from 'class-transformer'
import { CountryCode } from '@domain/country'
import { Keywords } from '@domain/youtube/channel/branding-settings/Keywords'

export class BrandingSettings {
  @Transform(({ value }: { value: Keywords }) => value.map(e => e.get()))
  public readonly keywords: Keywords
  @Transform(({ value }: { value: CountryCode }) => value.get())
  public readonly country: CountryCode

  constructor(args: { keywords: Keywords; country: CountryCode }) {
    this.keywords = args.keywords
    this.country = args.country
  }
}
