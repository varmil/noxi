import { Metadata } from 'next'
import { Period } from 'types/period'
import { getOgUrl } from 'utils/og-url'
import { ChannelsIdTemplate } from './_components/ChannelsIdTemplate'
import StripSubParam from './_components/StripSubParam'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from './_components/page/ChannelsIdBasePage'

type Props = ChannelsIdBasePageProps & {
  searchParams: Promise<{ period?: Period; sub?: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const base = await generateBaseMetadata({
    ...props,
    namespace: 'Page.group.channelsId.index.metadata'
  })

  const sub = (await props.searchParams).sub
  if (sub) {
    const { id } = await props.params
    return {
      ...base,
      openGraph: {
        images: [
          {
            url: getOgUrl(`/milestone?channelId=${id}&sub=${sub}`),
            width: 1200,
            height: 630
          }
        ]
      },
      twitter: {
        card: 'summary_large_image'
      }
    }
  }

  return base
}

export default async function GroupChannelsIdPage(props: Props) {
  const { id } = await props.params
  return (
    <ChannelsIdBasePage {...props}>
      <StripSubParam />
      <ChannelsIdTemplate id={id} />
    </ChannelsIdBasePage>
  )
}
