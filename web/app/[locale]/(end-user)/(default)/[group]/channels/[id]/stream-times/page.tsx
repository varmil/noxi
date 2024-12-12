import { Metadata } from 'next'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from '../_components/page/ChannelsIdBasePage'
import { ChannelsIdStreamTimesTemplate } from './_components/ChannelsIdStreamTimesTemplate'

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
      <ChannelsIdStreamTimesTemplate id={id} />
    </ChannelsIdBasePage>
  )
}
