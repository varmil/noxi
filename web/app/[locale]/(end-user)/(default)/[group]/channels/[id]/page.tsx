import { Metadata } from 'next'
import { Period } from 'types/period'
import { ChannelsIdTemplate } from './_components/ChannelsIdTemplate'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from './_components/page/ChannelsIdBasePage'

type Props = ChannelsIdBasePageProps & {
  searchParams: Promise<{ period?: Period }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.group.channelsId.index.metadata'
  })
}

export default async function GroupChannelsIdPage(props: Props) {
  const { id } = await props.params
  return (
    <ChannelsIdBasePage {...props}>
      <ChannelsIdTemplate id={id} />
    </ChannelsIdBasePage>
  )
}
