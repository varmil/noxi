'use client'

import { PropsWithChildren, useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { GroupString } from 'config/constants/Group'
import { ChannelCheerButton } from 'features/cheer-channel/button/ChannelCheerButton'

type Props = {
  basicInfo: ChannelSchema['basicInfo']
  group: GroupString
  defaultOpen?: boolean
  className?: string
}

export function ChannelProfileContent({
  basicInfo,
  group,
  defaultOpen = false,
  children,
  className
}: PropsWithChildren<Props>) {
  const global = useTranslations('Global')
  const [isExpanded, setIsExpanded] = useState(defaultOpen)
  const avatarIsHidden = isExpanded ? 'hidden sm:flex' : ''
  const { title: name, thumbnails } = basicInfo

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* Avatar, Name, Group, Description */}
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
            <Badge className="max-w-[200px] whitespace-nowrap bg-gradient-to-r from-blue-500 to-violet-500 text-white">
              {global(`group.${group}`)}
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

        {/* Cheer Button Section */}
        <div className="flex flex-col items-center gap-3 md:mt-2 lg:mt-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground pb-1.5">
                過去30日間の応援
              </p>
              <p className="text-xl font-bold">1,245回</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground pb-1.5">
                応援ランキング
              </p>
              <p className="text-xl font-bold">3位</p>
            </div>
          </div>

          <ChannelCheerButton />
        </div>
      </div>
    </div>
  )
}
