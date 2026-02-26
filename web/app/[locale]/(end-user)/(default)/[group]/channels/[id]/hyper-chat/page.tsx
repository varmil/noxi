import { Metadata } from 'next'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from '../_components/page/ChannelsIdBasePage'
import { ChannelsIdHyperChatTemplate } from './_components/ChannelsIdHyperChatTemplate'

type Props = ChannelsIdBasePageProps & {
  searchParams: Promise<{
    page?: string
    sort?: 'createdAt' | 'amount'
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.group.channelsId.hyperChat.metadata'
  })
}

export default async function GroupChannelsIdHyperChatPage(props: Props) {
  const { group, id } = await props.params
  const { page, sort } = await props.searchParams

  return (
    <ChannelsIdBasePage {...props}>
      <ChannelsIdHyperChatTemplate
        channelId={id}
        group={group}
        page={page ? parseInt(page, 10) : 1}
        sort={sort || 'createdAt'}
      />
    </ChannelsIdBasePage>
  )
}
