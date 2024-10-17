import { PropsWithoutRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SuperChatSchema } from 'apis/youtube/schema/superChatSchema'

function getBackgroundColor(tier: number): string {
  if (tier >= 7) return 'bg-[#e62117]'
  if (tier === 6) return 'bg-[#d13f64]'
  if (tier === 5) return 'bg-[#e18424]'
  if (tier === 4) return 'bg-[#f4cc42]'
  if (tier === 3) return 'bg-[#78e4b8]'
  if (tier === 2) return 'bg-[#75e1fd]'
  return 'bg-[#1564bf]'
}

export async function SuperChat({
  chat
}: PropsWithoutRef<{ chat: SuperChatSchema }>) {
  const {
    amountMicros,
    currency,
    amountDisplayString,
    tier,
    userComment,
    author,
    createdAt
  } = chat
  return (
    <div className={`mb-4 p-4 rounded-lg ${getBackgroundColor(tier)}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Avatar className="w-10 h-10 mr-3">
            <AvatarImage
              src={author.profileImageUrl}
              alt={author.displayName}
            />
            <AvatarFallback>{author.displayName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="text-sm text-muted-foreground">
            <p className="line-clamp-1">{author.displayName}</p>
            <p>{createdAt}</p>
          </div>
        </div>
        <div className="text-lg font-bold">{amountDisplayString}</div>
      </div>
      <p className="text-gray-700">{userComment}</p>
    </div>
  )
}
