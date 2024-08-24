import { MetadataRoute } from 'next'
import { defaultLocale, locales } from 'config/i18n/locale'
import dayjs from 'lib/dayjs'

const host = `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    getEntry({
      pathname: '/',
      lastModified: dayjs().subtract(7, 'day').toDate()
    }),
    getEntry({ pathname: '/hololive', lastModified: new Date() }),
    getEntry({
      pathname: '/hololive/charts/channels',
      lastModified: dayjs().subtract(1, 'day').toDate()
    }),
    getEntry({
      pathname: '/youtube/charts/channels',
      lastModified: dayjs().subtract(1, 'day').toDate()
    }),
    getEntry({
      pathname: '/terms-of-use-and-privacy-policy',
      lastModified: dayjs().subtract(14, 'day').toDate()
    })
  ]
}

function getEntry({
  pathname,
  lastModified
}: {
  pathname: string
  lastModified: Date
}): MetadataRoute.Sitemap[0] {
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
