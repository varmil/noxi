import en from './config/i18n/messages/en.json'
import { routing } from './config/i18n/routing'

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof en
    Locale: (typeof routing.locales)[number]
  }
}

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      /** the NODE_ENV */
      readonly NODE_ENV: 'development' | 'production' | 'test'

      /** shows which environment we are on */
      readonly ENV_NAME?: 'develop' | 'production'

      /** http(s)://... */
      readonly BASE_URL: string

      readonly YOUTUBE_DATA_API_KEY: string

      readonly EXCHANGE_RATE_API_KEY: string

      /**
       * The domain name of the generated Git branch URL.
       * Example: *-git-*.vercel.app.
       * The value does not include the protocol scheme https://.
       */
      readonly VERCEL_BRANCH_URL?: string

      /**
       * A production domain name of the project.
       * We select the shortest production custom domain,
       * or vercel.app domain if no custom domain is available.
       * Note, that this is always set, even in preview deployments.
       * This is useful to reliably generate links that point to production such as OG-image URLs.
       * The value does not include the protocol scheme https://.
       *
       * ローカルでのみundefined
       */
      readonly VERCEL_PROJECT_PRODUCTION_URL?: string

      readonly NEXT_PUBLIC_GA_ID?: string

      readonly VERCEL_ENV?: 'production' | 'preview' | 'development'

      /** 本番でのみ定義 */
      readonly CLARITY_CODE?: string
    }
  }
}
