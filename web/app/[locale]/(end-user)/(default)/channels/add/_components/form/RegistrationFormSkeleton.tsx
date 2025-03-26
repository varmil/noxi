import { Skeleton } from '@/components/ui/skeleton'

export default function RegistrationFormSkeleton() {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex items-center space-x-4 p-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="border-t bg-muted/20 p-4 space-y-3">
        <Skeleton className="mt-1 h-5 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}
