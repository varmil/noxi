import { Card } from '@/components/ui/card'
import StatsProgressCardContent from 'features/youtube-stats/components/progress-card/StatsProgressCardContent'
import StatsProgressCardFooter from 'features/youtube-stats/components/progress-card/StatsProgressCardFooter'
import StatsProgressCardHeader from 'features/youtube-stats/components/progress-card/StatsProgressCardHeader'

export default function StatsProgressCard() {
  return (
    <Card>
      <StatsProgressCardHeader
        description="This Week"
        mainText="+170"
        subText="views"
      />
      <StatsProgressCardContent>+25% from last week</StatsProgressCardContent>
      <StatsProgressCardFooter value={25} label="25% increase" />
    </Card>
  )
}
