import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'
import { locales, pathnames, localePrefix } from 'config/i18n/locale'

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix
  })

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
