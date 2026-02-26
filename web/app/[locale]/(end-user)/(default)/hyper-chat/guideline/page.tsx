import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Page } from 'components/page'
import { getAlternates } from 'utils/metadata/getAlternates'
import HyperChatGuidelineTemplate from './_components/HyperChatGuidelineTemplate'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const [global, page] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Pages.hyperChatGuideline'
    })
  ])

  return {
    title: `${page('metadata.title')} - ${global('title')}`,
    description: page('metadata.description'),
    alternates: getAlternates({
      pathname: '/hyper-chat/guideline',
      locale
    })
  }
}

export default async function HyperChatGuidelinePage() {
  return (
    <Page noPadding fullWidth>
      <HyperChatGuidelineTemplate />
    </Page>
  )
}
