declare namespace NodeJS {
  interface ProcessEnv {
    /** the NODE_ENV */
    readonly NODE_ENV: 'development' | 'production' | 'test'

    /** shows which environment we are on */
    readonly ENV_NAME: 'develop' | 'production'

    /** YouTube Data API v3 key */
    readonly YOUTUBE_DATA_API_KEY: string

    /** Prisma DB */
    readonly DATABASE_URL: string

    /** https://xxxxxxxx/api のx */
    readonly SERVER_HOSTNAME: string

    /** Use in Pubsubhubbub challenge */
    readonly YOUTUBE_PUBSUB_SECRET: string
  }
}

declare namespace PrismaJson {
  type Thumbnails = Partial<
    Record<
      'default' | 'medium' | 'high',
      { url?: string | null; width?: number | null; height?: number | null }
    >
  >

  type Keywords = string[]
}
