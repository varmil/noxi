import { Metadata } from 'next'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from '../_components/page/ChannelsIdBasePage'
import { ChannelsIdConcurrentViewersTemplate } from './_components/ChannelsIdConcurrentViewersTemplate'

type Props = ChannelsIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.group.channelsId.concurrentViewers.metadata'
  })
}

export default async function GroupChannelsIdConcurrentViewersPage(
  props: Props
) {
  const { id } = await props.params
  return (
    <ChannelsIdBasePage {...props}>
      <ChannelsIdConcurrentViewersTemplate id={id} />
    </ChannelsIdBasePage>
  )
}
