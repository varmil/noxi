'use client'

import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import dayjs from 'lib/dayjs'

type Props = {
  date?: string
}

export default function DailyHoverCard({ date }: Props) {
  const formatter = Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short'
  })

  return (
    <HoverCard open={true} openDelay={100} closeDelay={220}>
      <HoverCardTrigger tabIndex={0}>
        <div className="underline decoration-1 underline-offset-4 decoration-dashed decoration-slate-400 decoration">
          {formatter.format(dayjs(date).toDate())}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="font-normal">
        <div className="space-y-4">
          <h4 className="text-sm">ランキング詳細</h4>

          <div className="space-y-4">
            <div className="space-y-2">
              <h5 className="text-sm font-semibold">集計期間</h5>
              <div className="grid grid-cols-[4rem_1fr] gap-2 text-sm">
                <div className="text-muted-foreground">開始</div>
                <div>2024.10.01 09:00</div>
                <div className="text-muted-foreground">終了</div>
                <div>2024.11.01 08:59</div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-semibold">更新日時</h5>
              <div className="rounded-md bg-muted px-3 py-2 text-sm text-center">
                2024.11.01 21:41
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
