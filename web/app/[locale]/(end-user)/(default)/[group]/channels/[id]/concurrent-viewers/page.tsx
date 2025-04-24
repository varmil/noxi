import { Metadata } from 'next'
import { getWebUrl } from 'utils/web-url'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from '../_components/page/ChannelsIdBasePage'
import { ChannelsIdConcurrentViewersTemplate } from './_components/ChannelsIdConcurrentViewersTemplate'

type Props = ChannelsIdBasePageProps & {
  searchParams: Promise<{
    page?: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group, id } = await props.params
  return {
    ...(await generateBaseMetadata({
      ...props,
      namespace: 'Page.group.channelsId.concurrentViewers.metadata'
    })),
    alternates: {
      canonical: `${getWebUrl()}/${locale}/${group}/channels/${id}/concurrent-viewers`
    }
  }
}

export default async function GroupChannelsIdConcurrentViewersPage(
  props: Props
) {
  const { id } = await props.params
  const { page } = await props.searchParams
  return (
    <ChannelsIdBasePage {...props}>
      <ChannelsIdConcurrentViewersTemplate
        id={id}
        page={page ? Number(page) : undefined}
      />
    </ChannelsIdBasePage>
  )
}
