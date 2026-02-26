'use client'

import { useState } from 'react'
import { ChevronDown, MessagesSquare } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'

interface Props {
  hyperChat: HyperChatSchema
  channel?: ChannelSchema
  isLast: boolean
}

export function HyperChatTimelineItem({ hyperChat, channel, isLast }: Props) {
  const format = useFormatter()
  const [expanded, setExpanded] = useState(false)
  const t = useTranslations('Features.userPublicProfile.hyperChatTimeline')

  const amountDisplay =
    hyperChat.amount === 0
      ? t('freeTicket')
      : `￥${format.number(hyperChat.amount)}`

  const now = new Date()
  const createdAt = new Date(hyperChat.createdAt)
  const dateDisplay = format.dateTime(createdAt, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short'
  })
  const relativeTime = format.relativeTime(createdAt, now)

  return (
    <div className="relative flex gap-3 md:gap-5">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted md:h-10 md:w-10">
          <MessagesSquare className="h-4 w-4 text-muted-foreground md:h-[18px] md:w-[18px]" />
        </div>
        {!isLast && <div className="w-px flex-1 bg-border" />}
      </div>

      {/* Content */}
      <div className={cn('flex-1 pb-8', isLast && 'pb-0')}>
        {/* Header Row */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border text-[10px] font-medium md:text-xs"
          >
            {t('badge')}
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">
            {dateDisplay}
          </span>
          <span className="text-[10px] text-muted-foreground/70">
            {relativeTime}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="mt-1.5 text-sm font-semibold text-foreground md:text-base leading-snug">
          {t('posted')}
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed md:text-sm">
          {t('tierDescription', { tier: hyperChat.tier })}
        </p>

        {/* Expand button & Details */}
        <div className="mt-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors',
              'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
            aria-expanded={expanded}
          >
            {t('detail')}
            <ChevronDown
              className={cn(
                'h-3 w-3 transition-transform duration-200',
                expanded && 'rotate-180'
              )}
            />
          </button>
          <div
            className={cn(
              'grid transition-all duration-200 ease-out',
              expanded
                ? 'mt-2 grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            )}
          >
            <div className="overflow-hidden">
              <div className="rounded-lg border bg-card p-3 md:p-4">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-muted-foreground md:text-xs">
                      {t('amount')}
                    </dt>
                    <dd className="mt-0.5 text-xs font-semibold text-foreground md:text-sm">
                      {amountDisplay}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-muted-foreground md:text-xs">
                      {t('destination')}
                    </dt>
                    <dd className="mt-0.5 flex items-center gap-1.5">
                      {channel ? (
                        <>
                          <Avatar className="size-5">
                            <AvatarImage
                              src={channel.basicInfo.thumbnails.default?.url}
                              alt={channel.basicInfo.title}
                            />
                            <AvatarFallback>
                              {channel.basicInfo.title.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-semibold text-foreground md:text-sm line-clamp-1">
                            {channel.basicInfo.title}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
