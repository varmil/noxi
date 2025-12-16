import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import FAQGallery from 'features/faq/FAQGallery'
import { FAQs } from 'features/faq/types/FAQs'
import { getGroup } from 'lib/server-only-context/cache'

type Props = { id: string }

export async function ChannelsIdFAQTemplate({ id }: PropsWithoutRef<Props>) {
  const [faqs, t, { basicInfo }] = await Promise.all([
    importFAQs(id),
    getTranslations('Page.group.channelsId.faq'),
    getChannel(id)
  ])

  return (
    <Sections>
      <Section title={t('section.title')}>
        {faqs ? (
          <FAQGallery name={basicInfo.title} faqs={faqs} />
        ) : (
          <p>{t('section.noData')}</p>
        )}
      </Section>
    </Sections>
  )
}

const importFAQs = async (channelId: string) => {
  try {
    const group = getGroup()
    const { faqs } = (await import(
      `features/faq/assets/${group}/${channelId}`
    )) as { faqs: FAQs }
    return faqs
  } catch {
    return undefined
  }
}
