import { Metadata } from 'next'
import LiveIdBasePage, {
  generateBaseMetadata,
  LiveIdBasePageProps
} from '../_components/page/LiveIdBasePage'
import { LiveIdEarningsTemplate } from './_components/LiveIdEarningsTemplate'

type Props = LiveIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.youtube.live.id.index.metadata'
  })
}

export default async function YoutubeLiveIdEarningsPage(
  props: LiveIdBasePageProps
) {
  const { videoId } = await props.params
  return (
    <LiveIdBasePage {...props}>
      <LiveIdEarningsTemplate videoId={videoId} />
    </LiveIdBasePage>
  )
}
