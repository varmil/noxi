import { Card } from '@/components/ui/card'
import AnnotationText from 'components/styles/AnnotationText'
import StatsProgressCardContent from 'features/youtube/components/stats/progress-card/StatsProgressCardContent'
import StatsProgressCardFooter from 'features/youtube/components/stats/progress-card/StatsProgressCardFooter'
import StatsProgressCardHeader from 'features/youtube/components/stats/progress-card/StatsProgressCardHeader'
import { ChannelSchema } from 'features/youtube/types/channelSchema'
import { getLoyalty } from 'features/youtube/utils/loyalty'
import { PropsWithoutRef } from 'react'

type Props = ChannelSchema['statistics']

export default function StatsLoyaltyProgressCard(
  props: PropsWithoutRef<Props>
) {
  const loyalty = getLoyalty(props)

  return (
    <Card>
      <StatsProgressCardHeader
        description={
          <AnnotationText annotation="弊サービス独自指標です">
            ファン獲得スコア
          </AnnotationText>
        }
        mainText={loyalty.toString()}
        subText="points"
      />
      <StatsProgressCardContent>
        0-100。動画を見てくれた視聴者をファンに変えていく能力の高さ
      </StatsProgressCardContent>
      <StatsProgressCardFooter value={loyalty} label="25% increase" />
    </Card>
  )
}
