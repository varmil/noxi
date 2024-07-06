import { Country } from '@domain/youtube/channel/branding-settings/Country'
import { Keywords } from '@domain/youtube/channel/branding-settings/Keywords'

export class BrandingSettings {
  public readonly keywords: Keywords
  public readonly country: Country

  constructor(args: { keywords: Keywords; country: Country }) {
    this.keywords = args.keywords
    this.country = args.country
  }
}
