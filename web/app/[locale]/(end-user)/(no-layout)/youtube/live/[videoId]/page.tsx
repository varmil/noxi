import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { getStream } from 'apis/youtube/getStream'
import DefaultModeTemplate from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/mode/DefaultModeTemplate'
import TheaterModeTemplate from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/mode/TheaterModeTemplate'
import DefaultLayout from 'components/layouts/DefaultLayout'
import TheaterLayout from 'components/layouts/TheaterLayout'
import { Page } from 'components/page'
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
  params: { locale, videoId },
  searchParams
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  return (
    <LayoutFactory
      DefaultLayout={
        <DefaultLayout>
          <DefaultModePage
            params={{ locale, videoId }}
            searchParams={searchParams}
          />
        </DefaultLayout>
      }
      TheaterLayout={
        <TheaterLayout>
          <TheaterModePage
            params={{ locale, videoId }}
            searchParams={searchParams}
          />
        </TheaterLayout>
      }
    />
  )
}

async function DefaultModePage({ params: { locale, videoId } }: Props) {
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
      noPadding
    >
      <DefaultModeTemplate stream={stream} />
    </Page>
  )
}

async function TheaterModePage({ params: { locale, videoId } }: Props) {
  return <TheaterModeTemplate videoId={videoId} />
}
