import { Metadata } from 'next'
import LiveIdBasePage, {
  generateBaseMetadata,
  LiveIdBasePageProps
} from './_components/page/LiveIdBasePage'
import { LiveIdTemplate } from './_components/template/LiveIdTemplate'

type Props = LiveIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return await generateBaseMetadata({
    ...props,
    namespace: 'Page.youtube.live.id.index.metadata'
  })
}

export default async function YoutubeLiveIdPage(props: LiveIdBasePageProps) {
  const { videoId } = await props.params
  return (
    <LiveIdBasePage {...props}>
      <LiveIdTemplate videoId={videoId} />
    </LiveIdBasePage>
  )
}
