'use client'

import { PropsWithChildren, useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'

type Props = {
  basicInfo: ChannelSchema['basicInfo']
}

export function ChannelProfileContent({
  basicInfo,
  children
}: PropsWithChildren<Props>) {
  const { title: name, thumbnails } = basicInfo
  const [isExpanded, setIsExpanded] = useState(false)
  const avatarIsHidden = isExpanded ? 'hidden sm:flex' : ''

  return (
    <div className="py-6 px-0">
      <div className="flex items-start max-w-5xl gap-2.5 sm:gap-4">
        <Avatar className={`w-20 h-20 sm:w-28 sm:h-28 mt-4 ${avatarIsHidden}`}>
          <AvatarImage src={thumbnails.medium?.url} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">{name}</h1>
          <div className="max-w-xl break-anywhere whitespace-normal">
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? 'max-h-[10000px]' : 'max-h-[100px]'
              }`}
            >
              {children}
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
  )
}
