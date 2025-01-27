import { Skeleton } from '@/components/ui/skeleton'

export default function LiveIdXXXTemplateSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index}>
          <Skeleton className="h-[170px] w-full rounded-xs" />
        </div>
      ))}
    </div>
  )
}
