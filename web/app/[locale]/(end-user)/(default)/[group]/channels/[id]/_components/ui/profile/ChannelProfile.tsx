import { PropsWithoutRef } from 'react'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import FAQGallery from 'features/faq/FAQGallery'
import { FAQs } from 'features/faq/types/FAQs'
import { getGroup } from 'lib/server-only-context/cache'
import { ChannelProfileContent } from './ChannelProfileContent'

type Props = {
  basicInfo: ChannelSchema['basicInfo']
}

export async function ChannelProfile({ basicInfo }: PropsWithoutRef<Props>) {
  try {
    const group = getGroup()

    const { faqs } = (await import(
      `features/faq/assets/${group}/${basicInfo.id}`
    )) as { faqs: FAQs }
    return (
      <ChannelProfileContent basicInfo={basicInfo} defaultOpen>
        <FAQGallery name={basicInfo.title} faqs={faqs} />
      </ChannelProfileContent>
    )
  } catch (error) {
    const { description } = basicInfo
    return (
      <ChannelProfileContent basicInfo={basicInfo}>
        <div className="text-sm text-muted-foreground">{description}</div>
      </ChannelProfileContent>
    )
  }
}
