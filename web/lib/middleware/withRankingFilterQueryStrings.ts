import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { defaultCountry } from 'config/i18n/country'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'

/**
 * Query string rules mapped to specific path groups
 */
const QUERY_STRING_RULES: Record<string, RegExp[]> = {
  country: [],
  dimension: [/\/youtube\/live\/ranking$/],
  period: [/\/youtube\/live\/ranking$/]
}

/**
 * If not exists on header, uses default value (US)
 */
function getCountryCode(req: NextRequest): string {
  return req.headers.get('x-vercel-ip-country') || defaultCountry
}

/**
 * Resolve dynamic values for query parameters based on the rule key
 */
function resolveQueryValue(key: string, req: NextRequest): string | undefined {
  if (key === 'country') return getCountryCode(req)
  if (key === 'dimension') return 'concurrent-viewer'
  if (key === 'period') return 'daily'
  return undefined
}

/**
 * Add query strings dynamically for paths matching the rules in QUERY_STRING_RULES
 */
export const withRankingFilterQueryStrings: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    let isDirty = false

    const searchParams = request.nextUrl.searchParams
    const pathname = request.nextUrl.pathname

    // Iterate over query string rules
    for (const [key, patterns] of Object.entries(QUERY_STRING_RULES)) {
      if (patterns.some(pattern => pattern.test(pathname))) {
        // Add query string if it doesn't already exist
        if (!searchParams.has(key)) {
          const value = resolveQueryValue(key, request)
          if (value) {
            searchParams.set(key, value)
            isDirty = true
          }
        }
      }
    }

    if (isDirty) {
      const url = new URL(`${pathname}?${searchParams.toString()}`, request.url)
      return NextResponse.redirect(url)
    }

    return next(request, _next)
  }
}
