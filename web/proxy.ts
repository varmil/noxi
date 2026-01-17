import { NextRequest } from 'next/server'
import { fromQueryStringsToPathParameters } from 'lib/middleware/fromQueryStringsToPathParameters'
import { stackMiddlewares } from 'lib/middleware/stackMiddlewares'
import { withBasicAuth } from 'lib/middleware/withBasicAuth'
import { withIntl } from 'lib/middleware/withIntl'
import { withRemoveQueryStrings } from 'lib/middleware/withRemoveQueryStrings'

const middlewares = [
  withBasicAuth,
  fromQueryStringsToPathParameters,
  withRemoveQueryStrings,
  withIntl
]

const handler = stackMiddlewares(middlewares)

export function proxy(request: NextRequest) {
  return handler(request, {} as never)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}
