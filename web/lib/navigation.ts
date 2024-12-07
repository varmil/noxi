import { createNavigation } from 'next-intl/navigation'
import { routing } from 'config/i18n/routing'

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing)

/**
 * https://stackoverflow.com/questions/64158705/ignore-certain-console-errors-warnings-in-react
 */
{
  const warn = console.warn
  const SUPPRESSED_WARNINGS = ['Skipping auto-scroll']
  console.warn = function filterWarnings(msg: string, ...args) {
    if (!SUPPRESSED_WARNINGS.some(entry => msg.startsWith(entry))) {
      warn(msg, ...args)
    }
  }
}
