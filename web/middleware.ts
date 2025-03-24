import { stackMiddlewares } from 'lib/middleware/stackMiddlewares'
import { withIntl } from 'lib/middleware/withIntl'
import { withRankingFilterQueryStrings } from 'lib/middleware/withRankingFilterQueryStrings'
import { withRemoveQueryStrings } from 'lib/middleware/withRemoveQueryStrings'

const middlewares = [
  withRankingFilterQueryStrings,
  withRemoveQueryStrings,
  withIntl
]

export default stackMiddlewares(middlewares)

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}
