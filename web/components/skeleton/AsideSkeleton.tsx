import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function AsideSkeleton() {
  return (
    <div className="flex flex-col items-center px-2 py-3 gap-3">
      <Skeleton className="h-8 w-8 rounded-full mb-2.5" />

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
        (_, index) => (
          <div key={index}>
            <Skeleton className="size-7 rounded-full" />
          </div>
        )
      )}

      <Separator orientation="horizontal" />

      {[1].map((_, index) => (
        <div key={index}>
          <Skeleton className="size-7 rounded-full" />
        </div>
      ))}
    </div>
  )
}
