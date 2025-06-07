import { Metadata } from 'next'
import { Period } from 'types/period'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from '../_components/page/ChannelsIdBasePage'
import { ChannelsIdSuperChatTemplate } from './_components/ChannelsIdSuperChatTemplate'

type Props = ChannelsIdBasePageProps & {
  searchParams: Promise<{ period?: Period }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.group.channelsId.superChat.metadata'
  })
}

export default async function GroupChannelsIdSuperChatPage(props: Props) {
  const { id } = await props.params
  const { period } = await props.searchParams
  return (
    <ChannelsIdBasePage {...props}>
      <ChannelsIdSuperChatTemplate id={id} period={period || 'last30Days'} />
    </ChannelsIdBasePage>
  )
}
