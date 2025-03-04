import { Metadata } from 'next'
import { StreamGallerySearchParams } from 'features/group/types/stream-gallery'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from '../_components/page/ChannelsIdBasePage'
import { ChannelsIdASMRTemplate } from './_components/ChannelsIdASMRTemplate'

type Props = ChannelsIdBasePageProps & {
  searchParams: Promise<StreamGallerySearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.group.channelsId.asmr.metadata'
  })
}

export default async function GroupChannelsIdASMRPage(props: Props) {
  const { id } = await props.params
  return (
    <ChannelsIdBasePage {...props}>
      <ChannelsIdASMRTemplate id={id} searchParams={await props.searchParams} />
    </ChannelsIdBasePage>
  )
}
