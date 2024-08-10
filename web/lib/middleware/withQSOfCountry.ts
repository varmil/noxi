import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { defaultCountry } from 'config/i18n/country'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'

const PATHNAMES = ['/youtube/charts/channels']

/**
 * If not exists on header, uses default value (US)
 */
function getCountryCode(req: NextRequest): string {
  return req.headers.get('x-vercel-ip-country') || defaultCountry
}

/**
 * Add query string if `?country=xxx` not exists
 *
 * @example ?country=JP
 * @example ?country=US
 */
export const withQSOfCountry: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const searchParams = request.nextUrl.searchParams
    const pathname = request.nextUrl.pathname

    if (PATHNAMES.some(path => pathname.includes(path))) {
      const has = searchParams.has('country')
      if (!has) {
        searchParams.set('country', getCountryCode(request))
        const url = new URL(
          `${pathname}?${searchParams.toString()}`,
          request.url
        )
        return NextResponse.redirect(url)
      }
    }

    return next(request, _next)
  }
}
