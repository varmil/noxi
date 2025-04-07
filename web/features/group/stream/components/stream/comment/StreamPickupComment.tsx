import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getSuperChats } from 'apis/youtube/getSuperChats'

export default async function StreamPickupComment({
  videoId,
  className
}: {
  videoId: string
  className?: string
}) {
  const [superChat = undefined] = await getSuperChats({
    videoId,
    userCommentNotNull: true,
    orderBy: [
      { field: 'amountMicros', order: 'desc' },
      { field: 'createdAt', order: 'desc' }
    ],
    limit: 1
  })

  if (!superChat) return <div className={className} />

  const {
    amountDisplayString,
    author: { profileImageUrl, displayName },
    userComment
  } = superChat

  return (
    <div className={`flex gap-x-2 ${className ?? ''}`}>
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
    </div>
  )
}

const AuthorName = ({ displayName }: { displayName: string }) => (
  <span className="text-xs text-muted-foreground line-clamp-1 break-all">
    {displayName}
  </span>
)
