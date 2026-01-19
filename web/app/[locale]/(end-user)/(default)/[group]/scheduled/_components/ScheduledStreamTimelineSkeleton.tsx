import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const DAYS = 3
const ITEMS_PER_DAY = 3

export default function ScheduledStreamTimelineSkeleton() {
  return (
    <div className="space-y-8">
      {/* 日付セクション x 3日分 */}
      {Array.from({ length: DAYS }).map((_, dayIndex) => (
        <section key={dayIndex}>
          {/* 日付ヘッダー */}
          <div className="sticky top-14 z-40 -mx-4 mb-4 bg-muted/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
            <div className="flex items-baseline gap-3">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* 配信アイテム x 3件 */}
          <div className="space-y-3">
            {Array.from({ length: ITEMS_PER_DAY }).map((_, i) => (
              <Card key={i} className="py-3" data-testid="scheduled-stream-skeleton-item">
                <div className="flex p-3 md:p-4">
                  {/* 時刻 */}
                  <Skeleton className="w-16 h-8 shrink-0 mr-4 md:mr-6" />
                  {/* サムネイル */}
                  <Skeleton className="w-34 md:w-44 aspect-video rounded-md shrink-0 mr-2 md:mr-3" />
                  {/* 配信情報 */}
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-10 w-full max-w-md mb-3" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
