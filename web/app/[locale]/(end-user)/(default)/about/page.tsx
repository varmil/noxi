import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { getAlternates } from 'utils/metadata/getAlternates'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params

  const { locale } = params

  const tg = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Global'
  })
  const t = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'AboutUs'
  })

  return {
    title: `${t('title')} | ${tg('title')}`,
    description: `${t('description')}`,
    alternates: getAlternates({ pathname: '/about', locale })
  }
}

export default async function About(props: Props) {
  const params = await props.params

  const { locale } = params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  return (
    <Page>
      <h1>This is the About page</h1>
      <div className="text-3xl font-bold underline">Hello world!!</div>
    </Page>
  )
}
