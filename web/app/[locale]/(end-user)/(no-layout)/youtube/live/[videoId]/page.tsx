import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { getStream } from 'apis/youtube/getStream'
import DefaultModeTemplate from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/mode/DefaultModeTemplate'
import TheaterModeTemplate from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/mode/TheaterModeTemplate'
import DefaultLayout from 'components/layouts/DefaultLayout'
import TheaterLayout from 'components/layouts/TheaterLayout'
import { setGroup } from 'lib/server-only-context/cache'
import LayoutFactory from './_components/layouts/LayoutFactory'

type Props = {
  params: { locale: string; videoId: string }
  searchParams?: { theater?: '1' }
}

export async function generateMetadata({
  params: { locale, videoId }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.youtube.live.metadata'
  })
  const {
    snippet: { title }
  } = await getStream(videoId)

  return {
    title: `${t('title', { title })} | ${tg('title')}`,
    description: `${t('description')}`
  }
}

export default async function YoutubeLivePage({
  params: { locale, videoId }
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)
  const { group } = await getStream(videoId)
  setGroup(group)

  return (
    <LayoutFactory
      DefaultLayout={
        <DefaultLayout>
          <DefaultModePage params={{ locale, videoId }} />
        </DefaultLayout>
      }
      TheaterLayout={
        <TheaterLayout>
          <TheaterModePage params={{ locale, videoId }} />
        </TheaterLayout>
      }
    />
  )
}

async function DefaultModePage({ params: { videoId } }: Props) {
  return <DefaultModeTemplate videoId={videoId} />
}

async function TheaterModePage({ params: { videoId } }: Props) {
  return <TheaterModeTemplate videoId={videoId} />
}
