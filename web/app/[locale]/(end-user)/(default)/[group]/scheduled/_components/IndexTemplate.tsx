import { Suspense } from 'react'
import { getGroup } from 'lib/server-only-context/cache'
import ScheduledStreamTimeline from './ScheduledStreamTimeline'
import ScheduledStreamTimelineSkeleton from './ScheduledStreamTimelineSkeleton'

const SCHEDULE_DAYS = 7
const LOOKBACK_HOURS = 1 // 過去1時間からの配信も表示

export async function IndexTemplate() {
  const groupId = getGroup()
  const now = new Date()
  // 不純関数（Date.now）をコンポーネントのトップレベルで計算し、propsとして渡す
  const scheduledBefore = new Date(
    now.getTime() + SCHEDULE_DAYS * 24 * 60 * 60 * 1000
  )
  // 過去1時間からの配信も含める（直近で開始した配信を表示するため）
  const scheduledAfter = new Date(
    now.getTime() - LOOKBACK_HOURS * 60 * 60 * 1000
  )

  return (
    <section>
      <Suspense fallback={<ScheduledStreamTimelineSkeleton />}>
        <ScheduledStreamTimeline
          groupId={groupId}
          scheduledBefore={scheduledBefore}
          scheduledAfter={scheduledAfter}
        />
      </Suspense>
    </section>
  )
}
