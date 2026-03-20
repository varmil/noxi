import { NextRequest, NextResponse } from 'next/server'
import { fromQueryStringsToPathParameters } from 'lib/middleware/fromQueryStringsToPathParameters'
import { stackMiddlewares } from 'lib/middleware/stackMiddlewares'
import { withBasicAuth } from 'lib/middleware/withBasicAuth'
import { withIntl } from 'lib/middleware/withIntl'
// import { withMaintenance } from 'lib/middleware/withMaintenance'
import { withRemoveQueryStrings } from 'lib/middleware/withRemoveQueryStrings'

const middlewares = [
  // withMaintenance,
  withBasicAuth,
  fromQueryStringsToPathParameters,
  withRemoveQueryStrings,
  withIntl
]

const handler = stackMiddlewares(middlewares)

export function proxy(request: NextRequest) {
  // Vercel の CDN routing が sitemap.xml を動的ルート([id] 等)に
  // マッチさせる問題を回避するため、明示的に rewrite する
  if (request.nextUrl.pathname.endsWith('/sitemap.xml')) {
    return NextResponse.rewrite(new URL(request.nextUrl.pathname, request.url))
  }

  return handler(request, {} as never)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    // sitemap.xml はドットを含むが proxy で明示的にルーティングする必要がある
    '/:path*/sitemap.xml'
  ]
}
