import { Snippet } from '@domain/youtube/video/Snippet'
import { Statistics } from '@domain/youtube/video/Statistics'

export class Video {
  public readonly id: string
  public readonly snippet: Snippet
  public readonly statistics: Statistics

  constructor(args: { id: string; snippet: Snippet; statistics: Statistics }) {
    this.id = args.id
    this.snippet = args.snippet
    this.statistics = args.statistics
  }
}
