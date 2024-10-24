import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { getStream } from 'apis/youtube/getStream'
import DefaultModeTemplate from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/mode/DefaultModeTemplate'
import TheaterModeTemplate from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/mode/TheaterModeTemplate'
import DefaultLayout from 'components/layouts/DefaultLayout'
import TheaterLayout from 'components/layouts/TheaterLayout'
import AutoRouterRefresh from 'components/router/AutoRouterRefresh'
import { setGroup } from 'lib/server-only-context/cache'
import LayoutFactory from './_components/layouts/LayoutFactory'

type Props = {
  params: Promise<{ locale: string; videoId: string }>
  searchParams?: Promise<{ theater?: '1' }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { locale, videoId } = params

  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.youtube.live.metadata'
  })
  const {
    snippet: { title, channelId },
    group
  } = await getStream(videoId)
  const { basicInfo } = await getChannel(channelId)
  const groupName = tg(`group.${group}`)

  return {
    title: `${t('title', {
      title,
      group: groupName,
      channel: basicInfo.title
    })} - ${tg('title')}`,
    description: `${t('description', {
      channel: basicInfo.title
    })}`
  }
}

export default async function YoutubeLivePage(props: Props) {
  const params = await props.params

  const { locale, videoId } = params

  // Enable static rendering
  setRequestLocale(locale)
  const { group } = await getStream(videoId)
  setGroup(group)

  return (
    <AutoRouterRefresh intervalMs={60000}>
      <LayoutFactory
        DefaultLayout={
          <DefaultLayout>
            <DefaultModePage videoId={videoId} />
          </DefaultLayout>
        }
        TheaterLayout={
          <TheaterLayout>
            <TheaterModePage videoId={videoId} />
          </TheaterLayout>
        }
      />
    </AutoRouterRefresh>
  )
}

async function DefaultModePage({ videoId }: { videoId: string }) {
  return <DefaultModeTemplate videoId={videoId} />
}

async function TheaterModePage({ videoId }: { videoId: string }) {
  return <TheaterModeTemplate videoId={videoId} />
}
