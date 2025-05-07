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

    /** app.exchangerate-api.com key */
    readonly EXCHANGE_RATE_API_KEY: string

    /** XのToken */
    readonly X_APP_KEY: string
    readonly X_APP_SECRET: string
    readonly X_ACCESS_TOKEN: string
    readonly X_ACCESS_SECRET: string

    /** XへPOSTする際に用いる勘合符 */
    readonly X_POST_KEY: string

    readonly STRIPE_SECRET_KEY: string
    readonly STRIPE_WEBHOOK_SECRET: string
  }
}

declare namespace PrismaJson {
  // TODO: firebaseやめたらnull, undefinedなしにしてOK
  type Thumbnails = Partial<
    Record<
      'default' | 'medium' | 'high',
      { url?: string | null; width?: number | null; height?: number | null }
    >
  >

  type Keywords = string[]
}
