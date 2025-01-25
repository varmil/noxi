import { Metadata } from 'next'
import LiveIdBasePage, {
  generateBaseMetadata,
  LiveIdBasePageProps
} from '../../_components/page/LiveIdBasePage'
import { LiveIdSuperChatCommentsTemplate } from './_components/LiveIdSuperChatCommentsTemplate'

type Props = LiveIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.youtube.live.id.superChat.comments.metadata'
  })
}

export default async function YoutubeLiveIdSuperChatPage(
  props: LiveIdBasePageProps
) {
  const { videoId } = await props.params
  return (
    <LiveIdBasePage {...props}>
      <LiveIdSuperChatCommentsTemplate videoId={videoId} />
    </LiveIdBasePage>
  )
}
