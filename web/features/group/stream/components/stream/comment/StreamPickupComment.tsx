import { Suspense } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import StreamPickupCommentSkeleton from './StreamPickupCommentSkeleton'

export default async function StreamPickupComment({
  videoId,
  className
}: {
  videoId: string
  className?: string
}) {
  return (
    <div className={`flex gap-x-2 ${className ?? ''}`}>
      <Suspense fallback={<StreamPickupCommentSkeleton />}>
        <Content videoId={videoId} />
      </Suspense>
    </div>
  )
}

async function Content({ videoId }: { videoId: string }) {
  const [superChat = undefined] = await getSuperChats({
    videoId,
    userCommentNotNull: true,
    orderBy: [
      { field: 'amountMicros', order: 'desc' },
      { field: 'createdAt', order: 'desc' }
    ],
    limit: 1
  })
  if (!superChat) return null

  const {
    amountDisplayString,
    author: { profileImageUrl, displayName },
    userComment
  } = superChat

  return (
    <>
      <Avatar className="size-4">
        <AvatarImage src={profileImageUrl} alt={displayName} />
        <AvatarFallback>{displayName.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5 text-xs">
        <div className="flex items-center gap-2">
          <AuthorName displayName={displayName} />
          <div className="tabular-nums">{amountDisplayString}</div>
        </div>
        <span className="line-clamp-2 break-anywhere">{userComment}</span>
      </div>
    </>
  )
}

const AuthorName = ({ displayName }: { displayName: string }) => (
  <span className="text-xs text-muted-foreground line-clamp-1 break-all">
    {displayName}
  </span>
)
