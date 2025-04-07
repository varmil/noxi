import { Skeleton } from '@/components/ui/skeleton'

/** @deprecated delete me */
export default function RelatedVideosSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          <Skeleton className="h-[94.5px] w-42 rounded-xs" />
          <div className="flex-1 w-full space-y-2">
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            <Skeleton className="h-4 w-1/4 rounded" />
          </div>
        </div>
      ))}
    </>
  )
}
