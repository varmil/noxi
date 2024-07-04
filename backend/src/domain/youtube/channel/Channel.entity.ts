type Thumbnails =
  | Partial<
      Record<
        'default' | 'medium' | 'high' | 'standard' | 'maxres',
        { url: string; width?: number; height?: number }
      >
    >
  | {
      (key: 'default' | 'medium' | 'high' | 'standard' | 'maxres'): {
        url: string
        width?: number
        height?: number
      }
    }

export class Channel {
  public readonly id: string
  public readonly title: string
  public readonly description: string
  public readonly thumbnails: Thumbnails
  public readonly publishedAt: Date

  constructor(args: {
    id: string
    title: string
    description: string
    thumbnails: Thumbnails
    publishedAt: Date
  }) {
    this.id = args.id
    this.title = args.title
    this.description = args.description
    this.thumbnails = args.thumbnails
    this.publishedAt = args.publishedAt
  }
}
