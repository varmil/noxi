'use client'

import { PropsWithChildren, useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'

type Props = {
  basicInfo: ChannelSchema['basicInfo']
  groupName: string
}

/* Avatar, Name, Group, Description */
export function ChannelProfileSection({
  basicInfo,
  groupName,
  children
}: PropsWithChildren<Props>) {
  const [isExpanded, setIsExpanded] = useState(false)
  const avatarIsHidden = isExpanded ? 'hidden sm:flex' : ''
  const { title: name, thumbnails } = basicInfo

  return (
    <div className="flex-1 flex items-start max-w-5xl gap-2.5 sm:gap-4">
      <Avatar
        className={`size-20 md:size-24 lg:size-28 mt-4 ${avatarIsHidden}`}
      >
        <AvatarImage alt={name} src={thumbnails.medium?.url} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-x-2">
          {isExpanded && (
            <Avatar className={`size-6 sm:hidden`}>
              <AvatarImage alt={name} src={thumbnails.medium?.url} />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          )}
          <h1 className="text-xl font-bold">{name}</h1>
        </div>
        <Badge className="max-w-[200px] whitespace-nowrap bg-linear-to-r from-blue-500 to-violet-500 text-white">
          {groupName}
        </Badge>
        <div className="max-w-xl break-anywhere whitespace-normal">
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? 'max-h-[10000px]' : 'max-h-[64px]'
            }`}
          >
            {children}
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground"
              aria-label={isExpanded ? 'Read Less' : 'Read More'}
            >
              {isExpanded ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
