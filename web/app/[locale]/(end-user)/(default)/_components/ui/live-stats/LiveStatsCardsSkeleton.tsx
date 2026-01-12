import { Radio } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function LiveStatsCardsSkeleton() {
  return (
    <section className="grid grid-cols-1 @xl:grid-cols-2 gap-2 @xl:gap-4 h-full">
      <Card className="justify-center gap-2 shadow-xs">
        <CardHeader className="gap-0">
          <CardTitle className="text-sm flex justify-start items-center gap-2 font-medium">
            <Radio className="stroke-red-600 animate-pulse" size={16} />
            <Skeleton className="h-5 w-20" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-12" />
        </CardContent>
      </Card>

      <Card className="justify-center gap-2 shadow-xs">
        <CardHeader className="gap-0">
          <CardTitle className="text-sm flex justify-start items-center gap-2 font-medium">
            <Radio className="stroke-red-600 animate-pulse" size={16} />
            <Skeleton className="h-5 w-24" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16" />
        </CardContent>
      </Card>

      <div className="col-span-full flex lg:flex-row gap-2 @xl:gap-4">
        <Card className="flex-1 justify-center gap-2 shadow-xs">
          <CardHeader className="gap-0">
            <CardTitle className="text-sm flex justify-between items-center font-medium line-clamp-1 break-all">
              <Skeleton className="h-5 w-24" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>

        <Card className="flex-1 justify-center gap-2 shadow-xs">
          <CardHeader className="gap-0">
            <CardTitle className="text-sm flex justify-between items-center font-medium line-clamp-1 break-all">
              <Skeleton className="h-5 w-24" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
