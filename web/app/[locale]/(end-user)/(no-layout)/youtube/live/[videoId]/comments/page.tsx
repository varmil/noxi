import { Metadata } from 'next'
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
  return (
    <LiveIdBasePage {...props}>
      <LiveIdCommentsTemplate videoId={videoId} />
    </LiveIdBasePage>
  )
}
