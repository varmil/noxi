import { Metadata } from 'next'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from '../_components/page/ChannelsIdBasePage'
import { ChannelsIdHyperTrainTemplate } from './_components/ChannelsIdHyperTrainTemplate'

type Props = ChannelsIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.group.channelsId.hyperTrain.metadata'
  })
}

export default async function GroupChannelsIdHyperTrainPage(props: Props) {
  const { id } = await props.params

  return (
    <ChannelsIdBasePage {...props}>
      <ChannelsIdHyperTrainTemplate channelId={id} />
    </ChannelsIdBasePage>
  )
}
