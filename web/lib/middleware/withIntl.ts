import { NextRequest, NextFetchEvent, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale, localePrefix } from 'config/i18n/locale'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'

export const withIntl: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const handleI18nRouting = createMiddleware({
      // A list of all locales that are supported
      locales,

      // Used when no locale matches
      defaultLocale,

      localePrefix,

      localeDetection: false
    })

    return handleI18nRouting(request)
  }
}
