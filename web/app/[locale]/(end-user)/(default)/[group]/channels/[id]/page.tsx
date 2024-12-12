import { Metadata } from 'next'
import { ChannelIdTemplate } from './_components/ChannelIdTemplate'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from './_components/page/ChannelsIdBasePage'

type Props = ChannelsIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.group.channelsId.metadata'
  })
}

export default async function GroupChannelsIdPage(props: Props) {
  const { id } = await props.params
  return (
    <ChannelsIdBasePage {...props}>
      <ChannelIdTemplate id={id} />
    </ChannelsIdBasePage>
  )
}
