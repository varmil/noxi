import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { defaultCountry } from 'config/i18n/country'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'

/**
 * If not exists on header, uses default value (US)
 */
function getCountryCode(req: NextRequest): string {
  return req.headers.get('x-country-code') || defaultCountry
}

/**
 * ?country=JP
 * ?country=US
 */
export const withQSOfCountry: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const searchParams = request.nextUrl.searchParams
    const pathname = request.nextUrl.pathname

    if (['/ja/youtube/queries']?.some(path => pathname.startsWith(path))) {
      const has = searchParams.has('country')
      if (!has) {
        const url = new URL(
          `${pathname}?country=${getCountryCode(request)}`,
          request.url
        )
        return NextResponse.redirect(url)
      }
    }

    return next(request, _next)
  }
}
