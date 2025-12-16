import { Skeleton } from '@/components/ui/skeleton'

export default function HeaderAuthSkeleton() {
  return (
    <div className="relative ml-auto">
      {/* ログインボタンのサイズに合わせたスケルトン */}
      <Skeleton className="h-9 w-24 rounded-md" />
    </div>
  )
}
