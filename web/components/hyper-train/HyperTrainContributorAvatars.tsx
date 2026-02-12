'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { HyperTrainContributorSchema } from 'apis/hyper-trains/hyperTrainSchema'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'

type Props = {
  contributors: HyperTrainContributorSchema[]
  maxDisplay?: number
}

export function HyperTrainContributorAvatars({
  contributors,
  maxDisplay = 7
}: Props) {
  const t = useTranslations('Features.hyperTrain.contributorPopover')
  const format = useFormatter()
  const displayContributors = contributors.slice(0, maxDisplay)
  const remaining = contributors.length - maxDisplay

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="flex -space-x-2 cursor-pointer isolate">
          {displayContributors.map((contributor, i) => (
            <Avatar
              key={'contributor-' + i}
              className="size-7 border-2 border-background"
              style={{ zIndex: displayContributors.length - i }}
            >
              {contributor.image ? (
                <Image
                  src={contributor.image}
                  alt={contributor.name ?? ''}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <AvatarFallback className="text-xs">
                  {contributor.name?.charAt(0) ?? ' '}
                </AvatarFallback>
              )}
            </Avatar>
          ))}
          {remaining > 0 && (
            <Avatar className="size-7 border-2 border-background">
              <AvatarFallback className="text-xs bg-muted">
                +{remaining}
              </AvatarFallback>
            </Avatar>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-70 p-3">
        <h4 className="text-sm text-muted-foreground font-semibold mb-2">
          {t('title')}
        </h4>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {contributors.map((contributor, i) => (
            <li key={'popover-contributor-' + i}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium w-6 shrink-0 text-right">
                  {t('rank', { rank: i + 1 })}
                </span>
                <Avatar className="size-6 shrink-0">
                  {contributor.image ? (
                    <Image
                      src={contributor.image}
                      alt={contributor.name ?? ''}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <AvatarFallback className="text-[10px]">
                      {contributor.name?.charAt(0) ?? '?'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/users/${contributor.username ?? ''}`}
                    className="text-sm font-medium line-clamp-1 break-all hover:underline"
                    onClick={e => e.stopPropagation()}
                    prefetch={false}
                  >
                    {contributor.name ?? '匿名さん'}
                  </Link>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {t('points', { points: format.number(contributor.point) })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
