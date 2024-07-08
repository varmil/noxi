import { PropsWithoutRef } from 'react'
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
  const popularity = getPopularity(props)

  return (
    <Card>
      <StatsProgressCardHeader
        description={
          <AnnotationText annotation="弊サービス独自指標です">
            人気スコア
          </AnnotationText>
        }
        mainText={popularity.toString()}
        subText="points"
      />
      <StatsProgressCardContent>
        0-100。これまでの全活動を考慮したこのチャンネルの総合的な人気度
      </StatsProgressCardContent>
      <StatsProgressCardFooter value={popularity} label="25% increase" />
    </Card>
  )
}
