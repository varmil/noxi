import { NextRequest, NextFetchEvent } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from 'config/i18n/routing'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'

export const withIntl: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const handleI18nRouting = createMiddleware(routing)
    return handleI18nRouting(request)
  }
}
