import { defineRouting } from 'next-intl/routing'
import {
  defaultLocale,
  locales,
  pathnames,
  localePrefix
} from 'config/i18n/locale'

export const routing = defineRouting({
  defaultLocale,
  locales,
  localePrefix,
  pathnames
})
