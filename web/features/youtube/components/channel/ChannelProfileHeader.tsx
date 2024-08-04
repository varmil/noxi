import { PropsWithoutRef } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'
import { ChannelSchema } from 'features/youtube/types/channelSchema'

type Props = {
  name: string
  thumbnails: ChannelSchema['basicInfo']['thumbnails']
  description: string
  subscriberCount: number
}

export function ChannelProfileHeader({
  name,
  thumbnails,
  description,
  subscriberCount
}: PropsWithoutRef<Props>) {
  return (
    <div className="py-6 px-0">
      <div className="flex items-center max-w-5xl">
        <div className="flex items-center gap-4">
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
            <AvatarImage src={thumbnails.medium?.url} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">{name}</h1>
            <div className="max-w-lg break-all">{description}</div>
            <div className="text-sm text-secondary-foreground">
              <IntlNumberFormat>{subscriberCount}</IntlNumberFormat> Subscribers
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
