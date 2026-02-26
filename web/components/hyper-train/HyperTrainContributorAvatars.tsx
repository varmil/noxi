'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { HyperTrainContributorSchema } from 'apis/hyper-trains/hyperTrainSchema'
import { Link } from 'lib/navigation'

type Props = {
  contributors: HyperTrainContributorSchema[]
  maxDisplay?: number
}

function getDisplayName(
  contributor: HyperTrainContributorSchema,
  anonymousLabel: string
) {
  return contributor.isAnonymous ? anonymousLabel : contributor.name || ''
}

export function HyperTrainContributorAvatars({
  contributors,
  maxDisplay = 7
}: Props) {
  const tPopover = useTranslations('Features.hyperTrain.contributorPopover')
  const tChat = useTranslations('Features.hyperChat')
  const format = useFormatter()
  const displayContributors = contributors.slice(0, maxDisplay)
  const remaining = contributors.length - maxDisplay
  const anonymousLabel = tChat('anonymous.displayName')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex -space-x-2 cursor-pointer isolate"
        >
          {displayContributors.map((contributor, i) => {
            const displayName = getDisplayName(contributor, anonymousLabel)
            return (
              <Avatar
                key={'contributor-' + i}
                className="size-8 border-2 border-background"
                style={{ zIndex: displayContributors.length - i }}
              >
                {!contributor.isAnonymous && (
                  <AvatarImage
                    src={contributor.image ?? ''}
                    alt={displayName}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                )}
                <AvatarFallback className="text-xs">
                  {displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )
          })}
          {remaining > 0 && (
            <Avatar className="size-8 border-2 border-background">
              <AvatarFallback className="text-xs bg-muted">
                +{remaining}
              </AvatarFallback>
            </Avatar>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-70 p-3">
        <h4 className="text-sm text-muted-foreground font-semibold mb-2">
          {tPopover('title')}
        </h4>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {contributors.map((contributor, i) => {
            const displayName = getDisplayName(contributor, anonymousLabel)
            return (
              <li key={'popover-contributor-' + i}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium w-6 shrink-0 text-right">
                    {tPopover('rank', { rank: i + 1 })}
                  </span>
                  <Avatar className="size-6 shrink-0">
                    {!contributor.isAnonymous && (
                      <AvatarImage
                        src={contributor.image ?? ''}
                        alt={displayName}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                    <AvatarFallback className="text-[10px]">
                      {displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    {contributor.isAnonymous ? (
                      <span className="text-sm font-medium text-muted-foreground">
                        {tPopover('anonymousTotal', {
                          points: format.number(contributor.point)
                        })}
                      </span>
                    ) : (
                      <Link
                        href={`/users/${contributor.username ?? ''}`}
                        className="text-sm font-medium line-clamp-1 break-all hover:underline"
                        onClick={e => e.stopPropagation()}
                        prefetch={false}
                      >
                        {displayName}
                      </Link>
                    )}
                  </div>
                  {!contributor.isAnonymous && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {tPopover('points', {
                        points: format.number(contributor.point)
                      })}
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
