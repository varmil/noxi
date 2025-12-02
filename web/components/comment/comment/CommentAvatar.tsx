import { PropsWithoutRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
  profileImageUrl: string
  displayName: string
}

export default async function CommentAvatar({
  profileImageUrl,
  displayName
}: PropsWithoutRef<Props>) {
  return (
    <Avatar className="w-5 h-5 lg:w-8 lg:h-8 mt-0.5">
      <AvatarImage src={profileImageUrl} alt={displayName} />
      <AvatarFallback>{displayName.slice(0, 2)}</AvatarFallback>
    </Avatar>
  )
}
