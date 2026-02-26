import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Page } from 'components/page'
import { getAlternates } from 'utils/metadata/getAlternates'
import { getWebUrl } from 'utils/web-url'
import HyperChatAboutTemplate from './_components/HyperChatAboutTemplate'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const [global, page] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Pages.hyperChatAbout'
    })
  ])

  const title = `${page('metadata.title')} - ${global('title')}`
  const description = page('metadata.description')
  const ogImage = `${getWebUrl()}/images/ogp/ogp-hyper-chat-about.png`

  return {
    title,
    description,
    alternates: getAlternates({ pathname: '/hyper-chat/about', locale }),
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  }
}

export default async function HyperChatAboutPage() {
  return (
    <Page noPadding fullWidth>
      <HyperChatAboutTemplate />
    </Page>
  )
}
