import createMiddleware from 'next-intl/middleware'
import { locales } from 'config/i18n/locale'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'ja'
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ja|en)/:path*']
}
