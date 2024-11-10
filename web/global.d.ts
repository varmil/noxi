import en from './config/i18n/messages/en.json'

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      /** the NODE_ENV */
      readonly NODE_ENV: 'development' | 'production' | 'test'

      /** shows which environment we are on */
      readonly ENV_NAME: 'develop' | 'production'

      /** http(s)://... */
      readonly BASE_URL: string

      readonly YOUTUBE_DATA_API_KEY: string

      /**
       * The domain name of the generated Git branch URL.
       * Example: *-git-*.vercel.app.
       * The value does not include the protocol scheme https://.
       */
      readonly NEXT_PUBLIC_VERCEL_BRANCH_URL?: string

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
      readonly NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?: string

      readonly NEXT_PUBLIC_GA_ID?: string

      readonly NEXT_PUBLIC_VERCEL_ENV?: 'production' | 'preview' | 'development'
    }
  }
}
