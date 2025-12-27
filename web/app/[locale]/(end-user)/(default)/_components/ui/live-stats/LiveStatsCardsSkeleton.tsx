import { Radio } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function LiveStatsCardsSkeleton() {
  return (
    <section className="flex flex-col gap-2 lg:gap-4 h-full">
      <Card className="flex-1 justify-center col-span-full gap-2 shadow-xs">
        <CardHeader className="gap-0">
          <div className="text-sm flex justify-start items-center gap-2 font-medium">
            <Radio className="stroke-red-600 animate-pulse" />
            <Skeleton className="h-4 w-20" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-12" />
        </CardContent>
      </Card>

      <div className="flex-1 flex md:flex-col lg:flex-row gap-2 lg:gap-4">
        <Card className="flex-1 justify-center gap-2 shadow-xs">
          <CardHeader className="gap-0">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>

        <Card className="flex-1 justify-center gap-2 shadow-xs">
          <CardHeader className="gap-0">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
