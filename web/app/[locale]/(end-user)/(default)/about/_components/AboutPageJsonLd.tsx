import { getTranslations } from 'next-intl/server'
import { buildAboutPageJsonLd } from 'utils/json-ld/buildAboutPageJsonLd'
import { getWebUrl } from 'utils/web-url'

export default async function AboutPageJsonLd() {
  const [global, page] = await Promise.all([
    getTranslations('Global'),
    getTranslations('Pages.about')
  ])

  const jsonLd = buildAboutPageJsonLd({
    baseUrl: getWebUrl(),
    siteName: global('title'),
    siteDescription: page('metadata.description')
  })

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
