declare namespace NodeJS {
  interface ProcessEnv {
    /** the NODE_ENV */
    readonly NODE_ENV: 'development' | 'production' | 'test'

    /** shows which environment we are on */
    readonly ENV_NAME: 'develop' | 'production'

    /** Youtube Data API v3 key */
    readonly YOUTUBE_DATA_API_KEY: string
  }
}
