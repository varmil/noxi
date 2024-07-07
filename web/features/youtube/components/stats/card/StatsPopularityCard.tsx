import { Card } from '@/components/ui/card'
import AnnotationText from 'components/styles/AnnotationText'
import StatsCardContent from 'features/youtube/components/stats/card/StatsCardContent'
import StatsCardHeader from 'features/youtube/components/stats/card/StatsCardHeader'
import { Flag } from 'lucide-react'

export default function StatsPopularityCard() {
  return (
    <Card>
      <StatsCardHeader Icon={Flag}>
        <AnnotationText annotation="弊サービス独自指標です">
          人気度スコア
        </AnnotationText>
      </StatsCardHeader>
      <StatsCardContent subText="+18.1% from last week">
        1234567
      </StatsCardContent>
    </Card>
  )
}
