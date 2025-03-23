import { stackMiddlewares } from 'lib/middleware/stackMiddlewares'
import { withIntl } from 'lib/middleware/withIntl'
import { withRankingFilterQueryStrings } from 'lib/middleware/withRankingFilterQueryStrings'

const middlewares = [withRankingFilterQueryStrings, withIntl]

export default stackMiddlewares(middlewares)

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}

// @deprecated ↑良さそうならこちら消す
// export const config = {
//   matcher: [
//     // Enable a redirect to a matching locale at the root
//     '/',

//     // Set a cookie to remember the previous locale for
//     // all requests that have a locale prefix
//     '/(ja|en)/:path*'
//   ]
// }
