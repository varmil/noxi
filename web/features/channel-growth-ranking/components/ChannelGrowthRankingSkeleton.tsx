import {
  Card,
  CardContent,
  CardHeader
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ChannelGrowthRankingSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-4 w-80 mt-1" />
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex gap-x-2 pb-4 pt-3 overflow-hidden">
          {/* 左端のラベル列のスケルトン */}
          <div className="flex-shrink-0 pl-4 pr-2 flex flex-col">
            <div className="text-xs mb-1 invisible">0.</div>
            <div className="h-[92px]" />
            <div className="mt-2 flex flex-col gap-y-0.5">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
            </div>
          </div>

          {/* カードのスケルトン群 */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[100px]">
              <div className="relative flex flex-col">
                {/* 順位 */}
                <Skeleton className="h-4 w-4 mb-1" />

                {/* アバター */}
                <Skeleton className="size-[92px] rounded-md" />

                {/* データ表示 */}
                <div className="mt-2 flex flex-col gap-y-0.5">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-6 w-10" />
                  <Skeleton className="h-6 w-14" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
