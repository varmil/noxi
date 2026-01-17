import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'

const SUPER_ADMIN_PATH = '/super-admin'

/**
 * Basic Authentication middleware for super-admin pages
 * Protects /super-admin/* routes with HTTP Basic Auth
 */
export const withBasicAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname

    // Extract locale from pathname (e.g., /ja/super-admin -> /super-admin)
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '')

    // Only apply to super-admin routes
    if (!pathWithoutLocale.startsWith(SUPER_ADMIN_PATH)) {
      return next(request, event)
    }

    const username = process.env.SUPER_ADMIN_USERNAME
    const password = process.env.SUPER_ADMIN_PASSWORD

    // Skip auth if credentials are not configured (development convenience)
    if (!username || !password) {
      console.warn(
        'SUPER_ADMIN_USERNAME or SUPER_ADMIN_PASSWORD not set. Skipping auth.'
      )
      return next(request, event)
    }

    const authHeader = request.headers.get('authorization')

    if (authHeader) {
      const [scheme, encoded] = authHeader.split(' ')

      if (scheme === 'Basic' && encoded) {
        const decoded = atob(encoded)
        const [user, pass] = decoded.split(':')

        if (user === username && pass === password) {
          return next(request, event)
        }
      }
    }

    // Return 401 with WWW-Authenticate header
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Super Admin"'
      }
    })
  }
}
