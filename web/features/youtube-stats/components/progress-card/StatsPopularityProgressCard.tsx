import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import AnnotationText from 'components/styles/AnnotationText'
import StatsProgressCardContent from 'features/youtube-stats/components/progress-card/StatsProgressCardContent'
import StatsProgressCardFooter from 'features/youtube-stats/components/progress-card/StatsProgressCardFooter'
import StatsProgressCardHeader from 'features/youtube-stats/components/progress-card/StatsProgressCardHeader'
import { getPopularity } from 'features/youtube-stats/utils/popularity'

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
