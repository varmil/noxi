import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { LinkTabs } from 'components/link-tabs/LinkTabs'
import LiveIdBasePage, {
  generateBaseMetadata,
  LiveIdBasePageProps
} from '../_components/page/LiveIdBasePage'
import { LiveIdCommentsTemplate } from './_components/LiveIdCommentsTemplate'

type Props = LiveIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.youtube.live.id.comments.metadata'
  })
}

export default async function YoutubeLiveIdCommentsPage(
  props: LiveIdBasePageProps
) {
  const { videoId } = await props.params
  const t = await getTranslations('Features.live')
  return (
    <LiveIdBasePage {...props}>
      <LinkTabs
        tabs={[
          {
            label: t('superChatComments.nav'),
            href: `/youtube/live/${videoId}/super-chat/comments`
          },
          {
            label: t('comments.nav'),
            href: `/youtube/live/${videoId}/comments`
          }
        ]}
      />
      <LiveIdCommentsTemplate videoId={videoId} />
    </LiveIdBasePage>
  )
}
