'use client'

import { PropsWithoutRef, useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChannelSchema } from 'api-schema/youtube/channelSchema'

type Props = {
  name: string
  thumbnails: ChannelSchema['basicInfo']['thumbnails']
  description: string
}

export function ChannelProfileHeader({
  name,
  thumbnails,
  description
}: PropsWithoutRef<Props>) {
  const [isExpanded, setIsExpanded] = useState(false)

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
            <div className="max-w-lg break-all">
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-h-[1000px]' : 'max-h-[100px]'
                }`}
              >
                {description}
              </div>

              <div className="mt-2 flex justify-end">
                <Button
                  variant={isExpanded ? 'outline' : 'ghost'}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
