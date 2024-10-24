import { MetadataRoute } from 'next'
import { routing } from 'config/i18n/routing'

const host = `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`

export function getEntry({
  pathname,
  lastModified
}: {
  pathname: string
  lastModified: Date
}): MetadataRoute.Sitemap[0] {
  const { defaultLocale, locales } = routing
  return {
    url: getUrl(pathname, defaultLocale),
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        locales.map(locale => [locale, getUrl(pathname, locale)])
      )
    }
  }
}

function getUrl(pathname: string, locale: string) {
  return `${host}/${locale}${pathname === '/' ? '' : pathname}`
}
