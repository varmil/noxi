import { Transform } from 'class-transformer'
import { Keywords } from '@domain/youtube/channel/branding-settings/Keywords'

export class BrandingSettings {
  @Transform(({ value }: { value: Keywords }) => value.map(e => e.get()))
  public readonly keywords: Keywords

  constructor(args: { keywords: Keywords }) {
    this.keywords = args.keywords
  }
}
