import en from './config/i18n/messages/en.json'
import { routing } from './config/i18n/routing'
import '@testing-library/jest-dom'

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

      readonly CRON_SECRET: string

      readonly NEXT_PUBLIC_GA_ID?: string

      readonly VERCEL_ENV?: 'production' | 'preview' | 'development'
      readonly NEXT_PUBLIC_VERCEL_ENV?: 'production' | 'preview' | 'development'

      readonly YOUTUBE_DATA_API_KEY: string

      readonly EXCHANGE_RATE_API_KEY: string

      /** 本番でのみ定義 */
      readonly CLARITY_CODE?: string

      readonly STRIPE_SECRET_KEY: string
      readonly NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string

      readonly AUTH_SECRET: string
      readonly AUTH_RESEND_KEY: string
      readonly AUTH_GOOGLE_ID: string
      readonly AUTH_GOOGLE_SECRET: string
      readonly AUTH_APPLE_ID: string
      readonly AUTH_APPLE_SECRET: string
      readonly DATABASE_URL: string

      readonly OPENAI_API_KEY: string
    }
  }
}
