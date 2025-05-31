import Linkify from 'linkify-react'
import { CalendarDays } from 'lucide-react'
import { getFormatter } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardContent } from '@/components/ui/card'
import { UserProfileSchema } from 'apis/user-profiles/userProfileSchema'

interface ProfileHeaderProps {
  profile: UserProfileSchema
}

export async function ProfileHeader({ profile }: ProfileHeaderProps) {
  const format = await getFormatter()
  const formattedJoinDate = format.dateTime(profile.createdAt, {
    year: 'numeric',
    month: 'long'
  })

  return (
    <CardContent className="p-4 md:px-8">
      <div className="flex-1 flex gap-4 md:gap-8 lg:gap-12">
        <div className="flex-shrink-0 flex justify-center">
          <Avatar className="size-20 md:size-24 lg:size-28 mt-2">
            <AvatarImage
              src={profile.image || '/placeholder.svg'}
              alt={profile.name}
            />
            <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow space-y-2">
          <div>
            <h1 className="text-xl font-bold">{profile.name}</h1>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
          </div>

          <div className="">
            <h2 className="text-sm font-medium text-muted-foreground mb-1">
              自己紹介
            </h2>
            <p className="max-w-md text-sm whitespace-pre-line">
              <Linkify
                options={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  defaultProtocol: 'https',
                  className: 'underline text-blue-700 dark:text-blue-400'
                }}
              >
                {profile.description}
              </Linkify>
            </p>
          </div>

          <div className="flex items-center text-sm text-muted-foreground pt-2">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Joined {formattedJoinDate}</span>
          </div>
        </div>
      </div>
    </CardContent>
  )
}
