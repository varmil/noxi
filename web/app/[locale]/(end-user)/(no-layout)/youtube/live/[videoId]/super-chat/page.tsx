import { Metadata } from 'next'
import LiveIdBasePage, {
  generateBaseMetadata,
  LiveIdBasePageProps
} from '../_components/page/LiveIdBasePage'
import { LiveIdSuperChatTemplate } from './_components/LiveIdSuperChatTemplate'

type Props = LiveIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.youtube.live.id.superChat.metadata'
  })
}

export default async function YoutubeLiveIdSuperChatPage(
  props: LiveIdBasePageProps
) {
  const { videoId } = await props.params
  return (
    <LiveIdBasePage {...props}>
      <LiveIdSuperChatTemplate videoId={videoId} />
    </LiveIdBasePage>
  )
}
