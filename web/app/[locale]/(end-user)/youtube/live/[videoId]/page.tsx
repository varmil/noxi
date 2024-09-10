import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { getStream } from 'apis/youtube/getStream'
import { IndexTemplate } from 'app/[locale]/(end-user)/[group]/_components/IndexTemplate'
import NotFound from 'app/not-found'
import Page from 'components/Page'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  params: { locale: string; videoId: string }
}

export async function generateMetadata({
  params: { locale, videoId }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.youtube.live.metadata'
  })
  const stream = await getStream(videoId)

  return {
    title: `${t('title', { title: stream?.snippet.title ?? '' })} | ${tg(
      'title'
    )}`,
    description: `${t('description')}`
  }
}

export default async function YoutubeLivePage({
  params: { locale, videoId }
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const tg = await getTranslations('Global')
  const t = await getTranslations('Breadcrumb')

  const stream = await getStream(videoId)
  const group = stream.group
  setGroup(group)

  const {
    snippet: { title }
  } = stream

  return (
    <Page
      breadcrumb={[
        {
          href: `/${group}`,
          name: t('group', { group: tg(`group.${group}`) })
        },
        { href: '#', name: title }
      ]}
    >
      hello
    </Page>
  )
}
