import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { getAlternates } from 'utils/metadata/getAlternates'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ group?: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Page.ranking.superChatIndex.metadata'
  })

  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates({
      pathname: '/ranking/super-chat/channels',
      locale
    })
  }
}

export default async function SuperChatChannelsIndexPage(props: Props) {
  const { locale } = await props.params
  const searchParams = await props.searchParams

  setRequestLocale(locale as 'ja' | 'en')

  return (
    <Page noPadding fullWidth ads>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <IndexTemplate
          locale={locale as 'ja' | 'en'}
          group={searchParams.group}
        />
      </div>
    </Page>
  )
}
