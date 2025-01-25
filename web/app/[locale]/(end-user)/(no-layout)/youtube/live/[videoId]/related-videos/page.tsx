import { Metadata } from 'next'
import LiveIdBasePage, {
  generateBaseMetadata,
  LiveIdBasePageProps
} from '../_components/page/LiveIdBasePage'
import { LiveIdRelatedVideosTemplate } from './_components/LiveIdRelatedVideosTemplate'

type Props = LiveIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.youtube.live.id.relatedVideos.metadata'
  })
}

export default async function YoutubeLiveIdRelatedVideosPage(
  props: LiveIdBasePageProps
) {
  const { videoId } = await props.params
  return (
    <LiveIdBasePage {...props}>
      <LiveIdRelatedVideosTemplate videoId={videoId} />
    </LiveIdBasePage>
  )
}
