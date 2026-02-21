import { Skeleton } from '@/components/ui/skeleton'

export function HyperTrainStatsSkeleton() {
  return (
    <>
      {/* Title */}
      <div className="mb-4">
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="space-y-2 sm:space-y-3">
        {/* Stats row */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-3 text-center">
              <Skeleton className="mx-auto h-6 w-12 md:h-7" />
              <Skeleton className="mx-auto mt-1.5 h-3 w-16" />
            </div>
          ))}
        </div>

        {/* Most contributed talent */}
        <div className="rounded-lg border bg-card p-3">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 mt-1">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
          <Skeleton className="mx-auto mt-1.5 h-3 w-32" />
        </div>
      </div>
    </>
  )
}
