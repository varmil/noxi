import { Skeleton } from '@/components/ui/skeleton'

export default function RelatedVideosSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <Skeleton className="h-[90px] w-40 rounded-xs" />
          <div className="flex-1 w-full space-y-2">
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </>
  )
}
