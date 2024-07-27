import { Pathnames, LocalePrefix } from 'next-intl/routing'

export const defaultLocale = 'en' as const
export const locales = ['en', 'ja'] as const

export const pathnames: Pathnames<typeof locales> = {
  '/': '/'
  // '/pathnames': {
  //   en: '/pathnames',
  //   de: '/pfadnamen'
  // }
}

export const localePrefix: LocalePrefix<typeof locales> = 'always'
