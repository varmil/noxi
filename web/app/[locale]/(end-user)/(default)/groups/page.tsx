import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page.groups.metadata' })
  return {
    title: `${t('title')} - ${tg('title')}`,
    description: `${t('description')}`
  }
}

export default function GroupsPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale)

  return (
    <Page>
      <h1>This is the Groups page</h1>
      <div className="text-3xl font-bold underline">Hello world!!</div>
    </Page>
  )
}
