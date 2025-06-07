import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { DefaultPeriodByDimension } from 'config/constants/RankingRoute'
import { defaultCountry } from 'config/i18n/country'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'
import { normalizePathname } from 'lib/pathname'

/**
 * Default query parameters for each page and dimension
 */
const QUERY_STRING_RULES: Record<string, Record<string, string>> = {
  '/ranking/live': {
    dimension: 'concurrent-viewer',
    period: DefaultPeriodByDimension['concurrent-viewer']
  },
  '/ranking/channels': {
    dimension: 'super-chat',
    period: DefaultPeriodByDimension['super-chat']
  }
}

/**
 * If not exists on header, uses default value (US)
 */
function getCountryCode(req: NextRequest): string {
  return req.headers.get('x-vercel-ip-country') || defaultCountry
}

/**
 * Resolve dynamic query values based on the key, pathname, and other parameters
 */
function resolveQueryValue(
  key: string,
  req: NextRequest,
  normalizedPathname: string,
  searchParams: URLSearchParams
): string | undefined {
  if (key === 'country') return getCountryCode(req)

  if (key === 'dimension') {
    const defaultDimension = QUERY_STRING_RULES[normalizedPathname]?.dimension
    return searchParams.get('dimension') || defaultDimension
  }

  if (key === 'period') {
    const dimension =
      searchParams.get('dimension') ||
      QUERY_STRING_RULES[normalizedPathname]?.dimension
    return (
      DefaultPeriodByDimension[dimension] ||
      QUERY_STRING_RULES[normalizedPathname]?.period
    )
  }

  return undefined
}

/**
 * @deprecated 2025/06/07 クエリストリングは使わずパスパラメータに統合した
 * Add query strings dynamically for paths matching the rules in QUERY_STRING_RULES
 */
export const withRankingFilterQueryStrings: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    let isDirty = false

    const searchParams = request.nextUrl.searchParams
    const normalizedPathname = normalizePathname(request.nextUrl.pathname)

    if (normalizedPathname in QUERY_STRING_RULES) {
      // Iterate over query string keys for the matched normalized pathname
      for (const key of Object.keys(QUERY_STRING_RULES[normalizedPathname])) {
        if (!searchParams.has(key)) {
          const value = resolveQueryValue(
            key,
            request,
            normalizedPathname,
            searchParams
          )
          if (value) {
            searchParams.set(key, value)
            isDirty = true
          }
        }
      }
    }

    if (isDirty) {
      const url = new URL(
        `${request.nextUrl.pathname}?${searchParams.toString()}`,
        request.url
      )
      return NextResponse.redirect(url)
    }

    return next(request, _next)
  }
}
