type Thumbnails = {
  (key: 'default' | 'medium' | 'high' | 'standard' | 'maxres'): {
    url: string
    width: number
    height: number
  }
}

export class Channel {
  public readonly id: string
  public readonly title: string
  public readonly description: string
  public readonly thumbnails: Thumbnails
  public readonly publishedAt: Date
}
