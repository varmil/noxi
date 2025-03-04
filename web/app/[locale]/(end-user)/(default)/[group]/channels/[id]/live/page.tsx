import { Metadata } from 'next'
import { StreamGallerySearchParams } from 'features/group/types/stream-gallery'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from '../_components/page/ChannelsIdBasePage'
import { ChannelsIdLiveTemplate } from './_components/ChannelsIdLiveTemplate'

type Props = ChannelsIdBasePageProps & {
  searchParams: Promise<StreamGallerySearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.group.channelsId.live.metadata'
  })
}

export default async function GroupChannelsIdLivePage(props: Props) {
  const { id } = await props.params
  return (
    <ChannelsIdBasePage {...props}>
      <ChannelsIdLiveTemplate id={id} searchParams={await props.searchParams} />
    </ChannelsIdBasePage>
  )
}
