import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Page } from 'components/page'
import { getAlternates } from 'utils/metadata/getAlternates'
import { HyperChatScrambleTemplate } from './_components/HyperChatScrambleTemplate'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const [global, page] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Pages.hyperChatScramble'
    })
  ])

  return {
    title: `${page('metadata.title')} - ${global('title')}`,
    description: page('metadata.description'),
    alternates: getAlternates({ pathname: '/hyper-chat', locale })
  }
}

export default async function HyperChatScramblePage(props: Props) {
  const [{ page }, pageT] = await Promise.all([
    props.searchParams,
    getTranslations('Pages.hyperChatScramble')
  ])
  const currentPage = Number(page) || 1

  return (
    <Page
      breadcrumb={[{ href: '/hyper-chat', name: pageT('metadata.title') }]}
      h1={pageT('metadata.title')}
    >
      <HyperChatScrambleTemplate page={currentPage} />
    </Page>
  )
}
