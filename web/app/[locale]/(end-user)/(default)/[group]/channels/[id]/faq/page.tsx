import { Metadata } from 'next'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from '../_components/page/ChannelsIdBasePage'
import { ChannelsIdFAQTemplate } from './_components/ChannelsIdFAQTemplate'

type Props = ChannelsIdBasePageProps

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.group.channelsId.faq.metadata'
  })
}

export default async function GroupChannelsIdFAQPage(props: Props) {
  const { id } = await props.params
  return (
    <ChannelsIdBasePage {...props}>
      <ChannelsIdFAQTemplate id={id} />
    </ChannelsIdBasePage>
  )
}
