import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function StreamGallerySkeleton({
  className
}: {
  className?: string
}) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6" /> {/* アイコン用のSkeleton */}
          <Skeleton className="h-6 w-32" /> {/* タイトル用のSkeleton */}
        </div>
        <Skeleton className="h-6 w-20" /> {/* Badge用のSkeleton */}
      </CardHeader>
      <CardContent className="grid gap-x-2 sm:gap-x-4 gap-y-6 sm:gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="grid gap-2">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="flex gap-x-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
