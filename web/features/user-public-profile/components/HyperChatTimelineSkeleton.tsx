import { Skeleton } from '@/components/ui/skeleton'

export function HyperChatTimelineSkeleton() {
  return (
    <div>
      {/* Count */}
      <div className="mb-4">
        <Skeleton className="h-4 w-28" />
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        {/* Month header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-24 rounded-md" />
          <div className="h-px flex-1 bg-border" />
          <Skeleton className="h-3 w-8" />
        </div>

        {/* Timeline items */}
        <div className="pl-0 md:pl-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative flex gap-3 md:gap-5">
              {/* Dot + line */}
              <div className="flex flex-col items-center">
                <Skeleton className="h-9 w-9 rounded-full md:h-10 md:w-10" />
                {i < 4 && <div className="w-px flex-1 bg-border" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8 space-y-1.5">
                {/* Header: badge + date + relative */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-10 rounded-full" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-12" />
                </div>
                {/* Title */}
                <Skeleton className="h-5 w-44 md:h-5" />
                {/* Description */}
                <Skeleton className="h-4 w-36 md:h-4" />
                {/* Detail button */}
                <Skeleton className="h-6 w-14 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
