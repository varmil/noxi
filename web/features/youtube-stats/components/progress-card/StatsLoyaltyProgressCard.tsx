import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import { ChannelSchema } from 'api-schema/youtube/channelSchema'
import AnnotationText from 'components/styles/AnnotationText'
import StatsProgressCardContent from 'features/youtube-stats/components/progress-card/StatsProgressCardContent'
import StatsProgressCardFooter from 'features/youtube-stats/components/progress-card/StatsProgressCardFooter'
import StatsProgressCardHeader from 'features/youtube-stats/components/progress-card/StatsProgressCardHeader'
import { getLoyalty } from 'features/youtube/utils/loyalty'

type Props = ChannelSchema['statistics']

export default function StatsLoyaltyProgressCard(
  props: PropsWithoutRef<Props>
) {
  const t = useTranslations('Features.youtube.stats')
  const loyalty = getLoyalty(props)

  return (
    <Card>
      <StatsProgressCardHeader
        description={
          <AnnotationText annotation={t('annotation')}>
            {t('progress.fanAcquisitionScore')}
          </AnnotationText>
        }
        mainText={loyalty.toString()}
        subText="points"
      />
      <StatsProgressCardContent>
        {t('progress.fanAcquisitionDescription')}
      </StatsProgressCardContent>
      <StatsProgressCardFooter value={loyalty} label="25% increase" />
    </Card>
  )
}
