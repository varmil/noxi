import { Radio } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function LiveStatsCardsSkeleton() {
  return (
    <section className="grid grid-cols-2 gap-2 h-full">
      <Card className="justify-center gap-1 shadow-xs">
        <CardHeader className="gap-0 pb-0">
          <CardTitle className="text-sm flex items-center gap-2 font-medium">
            <Radio className="stroke-red-600 animate-pulse" size={16} />
            <Skeleton className="h-5 w-20" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-1">
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-4 w-24 mt-2" />
        </CardContent>
      </Card>

      <Card className="justify-center gap-1 shadow-xs">
        <CardHeader className="gap-0 pb-0">
          <CardTitle className="text-sm flex items-center gap-2 font-medium">
            <Radio className="stroke-red-600 animate-pulse" size={16} />
            <Skeleton className="h-5 w-24" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-1">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-28 mt-2" />
        </CardContent>
      </Card>

      <Card className="justify-center gap-1 shadow-xs">
        <CardHeader className="gap-0 pb-0">
          <CardTitle className="text-sm font-medium">
            <Skeleton className="h-5 w-24" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-1">
          <Skeleton className="h-8 w-20" />
        </CardContent>
      </Card>

      <Card className="justify-center gap-1 shadow-xs">
        <CardHeader className="gap-0 pb-0">
          <CardTitle className="text-sm font-medium">
            <Skeleton className="h-5 w-24" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-1">
          <Skeleton className="h-8 w-20" />
        </CardContent>
      </Card>
    </section>
  )
}
