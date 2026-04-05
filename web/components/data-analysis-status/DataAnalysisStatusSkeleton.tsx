import { Skeleton } from '@/components/ui/skeleton'

export function DataAnalysisStatusSkeleton() {
  return (
    <section>
      <div className="mx-auto max-w-[1200px] px-4 py-5 sm:px-6 lg:px-8">
        <Skeleton className="mb-4 h-4 w-40" />

        <div className="overflow-hidden rounded-xl bg-border p-[1px]">
          <div className="grid grid-cols-2 gap-[1px] md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 bg-card px-6 py-5"
              >
                <div className="min-w-0">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-2 h-8 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
