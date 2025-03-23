import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // Used when no locale matches
  defaultLocale: 'ja',

  // A list of all locales that are supported
  locales: ['en', 'ja'],

  localePrefix: 'always',

  // Expire in one year
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365
  }
})
