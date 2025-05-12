import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserProfileSchema } from 'apis/user-profiles/userProfileSchema'

export default function UserThumbnail({
  profile,
  className
}: {
  profile: UserProfileSchema
  className?: string
}) {
  return (
    <Avatar
      className={`size-10 transition-all hover:scale-105 ${className || ''}`}
    >
      <AvatarImage src={profile.image} alt={profile.name} />
      <AvatarFallback>{profile.name}</AvatarFallback>
    </Avatar>
  )
}
