import { Skeleton } from '@/components/ui/skeleton'

export default function StreamPickupCommentSkeleton() {
  return (
    <>
      <Skeleton className="size-4 rounded-full" />
      <div className="w-full flex flex-col gap-0.5 text-xs">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-[30%] rounded" />
          <Skeleton className="h-4 w-[30%] rounded" />
        </div>
        <Skeleton className="h-8 w-full rounded" />
      </div>
    </>
  )
}
