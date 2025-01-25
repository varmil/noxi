import { Metadata } from 'next'
import YoutubeLiveIdBasePage, {
  generateBaseMetadata,
  YoutubeLiveIdBasePageProps
} from './_components/page/YoutubeLiveIdBasePage'
import { YoutubeLiveIdTemplate } from './_components/template/YoutubeLiveIdTemplate'

type Props = YoutubeLiveIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.youtube.live.id.index.metadata'
  })
}

export default async function YoutubeLiveIdPage(
  props: YoutubeLiveIdBasePageProps
) {
  const { videoId } = await props.params
  return (
    <YoutubeLiveIdBasePage {...props}>
      <YoutubeLiveIdTemplate videoId={videoId} />
    </YoutubeLiveIdBasePage>
  )
}
