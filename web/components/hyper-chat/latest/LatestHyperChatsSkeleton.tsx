import { MessagesSquare } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export function LatestHyperChatsSkeleton() {
  return (
    <section className="z-0 w-full max-w-6xl pt-12 pb-2 px-4 sm:px-6 mx-auto">
      <div className="mx-auto">
        <div className="mb-4 flex items-center gap-2 sm:mb-6">
          <MessagesSquare className="size-5 text-muted-foreground" />
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="flex gap-3 sm:gap-4 overflow-hidden pb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center w-24 shrink-0">
              <Skeleton className="mb-2 size-23 rounded-lg" />
              <Skeleton className="h-4 w-22 mb-1" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
