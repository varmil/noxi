import { stackMiddlewares } from 'lib/middleware/stackMiddlewares'
import { withIntl } from 'lib/middleware/withIntl'
import { withQSOfCountry } from 'lib/middleware/withQSOfCountry'

const middlewares = [withQSOfCountry, withIntl]

export default stackMiddlewares(middlewares)

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(ja|en)/:path*'
  ]
}
