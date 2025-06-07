import { MetadataRoute } from 'next'
import { Locale } from 'next-intl'
import { routing } from 'config/i18n/routing'

/**
 * @note Next15からは MetadataRoute.Sitemap が使える
 * @docs https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps?hl=ja
 **/
type Video = {
  title: string
  description: string //'this is the description'
  content_loc: string
  thumbnail_loc: string // 'https://example.com/image.jpg'
}

const host = `https://www.vcharts.net`

export function getEntry({
  pathname,
  changeFrequency,
  lastModified,
  videos
}: {
  pathname: string
  changeFrequency?: MetadataRoute.Sitemap[0]['changeFrequency']
  lastModified?: Date
  videos?: Video[]
}): MetadataRoute.Sitemap[0] & { videos?: Video[] } {
  const { defaultLocale, locales } = routing
  return {
    url: getUrl(pathname, defaultLocale),
    changeFrequency,
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        locales.map(locale => [locale, getUrl(pathname, locale)])
      )
    },
    videos
  }
}

function getUrl(pathname: string, locale: Locale) {
  return `${host}/${locale}${pathname === '/' ? '' : pathname}`
}
