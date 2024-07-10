import { Transform } from 'class-transformer'
import { Country } from '@domain/youtube/channel/branding-settings/Country'
import { Keywords } from '@domain/youtube/channel/branding-settings/Keywords'

export class BrandingSettings {
  @Transform(({ value }: { value: Keywords }) => value.map(e => e.get()))
  public readonly keywords: Keywords
  @Transform(({ value }: { value: Country }) => value.get())
  public readonly country: Country

  constructor(args: { keywords: Keywords; country: Country }) {
    this.keywords = args.keywords
    this.country = args.country
  }
}
