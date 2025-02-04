import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { getStatistics } from 'apis/youtube/data-api/getStatistics'
import { getSuperChatsCount } from 'apis/youtube/getSuperChats'
import BadgeSkeleton from 'components/skeleton/BadgeSkeleton'

type Props = {
  videoId: string
  className?: string
}

/** スパチャコメント＋コメントの数をBadgeで表示する */
export default async function LocalNavigationItemOfComments({
  videoId
}: Props) {
  const t = await getTranslations('Features.live')
  return (
    <div className="flex items-baseline gap-1">
      <span>{t('comments.nav')}</span>
      <Suspense fallback={<BadgeSkeleton />}>
        <CountBadge videoId={videoId} />
      </Suspense>
    </div>
  )
}

/** Suspense用 */
async function CountBadge({ videoId, className }: Props) {
  const [[{ statistics } = {}], superChatsCount] = await Promise.all([
    getStatistics({ videoIds: [videoId] }),
    getSuperChatsCount({ videoId })
  ])
  const commentsCount = statistics?.commentCount ?? 0
  const totalCount = commentsCount + superChatsCount
  return (
    <Badge variant="secondary" className={className ?? ''}>
      {totalCount}
    </Badge>
  )
}
