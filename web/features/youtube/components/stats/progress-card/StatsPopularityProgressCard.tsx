import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import AnnotationText from 'components/styles/AnnotationText'
import StatsProgressCardContent from 'features/youtube/components/stats/progress-card/StatsProgressCardContent'
import StatsProgressCardFooter from 'features/youtube/components/stats/progress-card/StatsProgressCardFooter'
import StatsProgressCardHeader from 'features/youtube/components/stats/progress-card/StatsProgressCardHeader'
import { ChannelSchema } from 'features/youtube/types/channelSchema'
import { getPopularity } from 'features/youtube/utils/popularity'

type Props = ChannelSchema['statistics']

export default function StatsPopularityProgressCard(
  props: PropsWithoutRef<Props>
) {
  const t = useTranslations('Features.youtube.stats')
  const popularity = getPopularity(props)

  return (
    <Card>
      <StatsProgressCardHeader
        description={
          <AnnotationText annotation={t('annotation')}>
            {t('progress.popularityScore')}
          </AnnotationText>
        }
        mainText={popularity.toString()}
        subText="points"
      />
      <StatsProgressCardContent>
        {t('progress.popularityDescription')}
      </StatsProgressCardContent>
      <StatsProgressCardFooter value={popularity} label="25% increase" />
    </Card>
  )
}
