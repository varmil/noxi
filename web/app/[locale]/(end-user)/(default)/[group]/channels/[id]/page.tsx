import { Metadata } from 'next'
import { Period } from 'types/period'
import { getWebUrl } from 'utils/web-url'
import { ChannelsIdTemplate } from './_components/ChannelsIdTemplate'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from './_components/page/ChannelsIdBasePage'

type Props = ChannelsIdBasePageProps & {
  searchParams: Promise<{ period?: Period }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group, id } = await props.params
  return {
    ...(await generateBaseMetadata({
      ...props,
      namespace: 'Page.group.channelsId.index.metadata'
    })),
    alternates: {
      canonical: `${getWebUrl()}/${locale}/${group}/channels/${id}`
    }
  }
}

export default async function GroupChannelsIdPage(props: Props) {
  const { id } = await props.params
  const { period } = await props.searchParams
  return (
    <ChannelsIdBasePage {...props}>
      <ChannelsIdTemplate id={id} period={period || 'last24Hours'} />
    </ChannelsIdBasePage>
  )
}
