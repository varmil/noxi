import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'
import { locales, pathnames, localePrefix } from 'config/i18n/locale'

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix
  })
