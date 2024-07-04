export type Thumbnails = {
  (key: 'default' | 'medium' | 'high' | 'standard' | 'maxres'): {
    url: string
    width: number
    height: number
  }
}

export type Channel = {
  id: string
  title: string
  description: string
  thumbnails: Thumbnails
  publishedAt: string
}

export type Channels = Channel[]
