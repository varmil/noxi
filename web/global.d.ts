import en from './config/i18n/messages/en.json'

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}

  interface ProcessEnv {
    /** the NODE_ENV */
    readonly NODE_ENV: 'development' | 'production' | 'test'

    /** shows which environment we are on */
    readonly ENV_NAME: 'develop' | 'production'

    /** http(s)://... */
    readonly BASE_URL: string

    readonly NEXT_PUBLIC_GA_ID?: string
  }
}
