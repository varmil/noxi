import { Metadata } from 'next'
import LiveIdBasePage, {
  generateBaseMetadata,
  LiveIdBasePageProps
} from '../_components/page/LiveIdBasePage'
import { LiveIdConcurrentViewersTemplate } from './_components/LiveIdConcurrentViewersTemplate'

type Props = LiveIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.youtube.live.id.concurrentViewers.metadata'
  })
}

export default async function YoutubeLiveIdConcurrentViewersPage(
  props: LiveIdBasePageProps
) {
  const { videoId } = await props.params
  return (
    <LiveIdBasePage {...props}>
      <LiveIdConcurrentViewersTemplate videoId={videoId} />
    </LiveIdBasePage>
  )
}
