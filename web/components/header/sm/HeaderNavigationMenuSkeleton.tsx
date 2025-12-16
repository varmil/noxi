import { Skeleton } from '@/components/ui/skeleton'

export default function HeaderNavigationMenuSkeleton() {
  return (
    <div className="hidden md:block">
      <div className="flex items-center gap-1">
        {/* ナビゲーションリンク (lg以上で表示) */}
        <Skeleton className="hidden lg:block h-9 w-28 rounded-md" />
        <Skeleton className="hidden lg:block h-9 w-28 rounded-md" />
        <Skeleton className="hidden lg:block h-9 w-28 rounded-md" />
        {/* 検索バー */}
        <Skeleton className="ml-4 h-9 md:w-[36vw] lg:w-[max(20vw,200px)] xl:w-[min(35vw,600px)] rounded-md" />
      </div>
    </div>
  )
}
