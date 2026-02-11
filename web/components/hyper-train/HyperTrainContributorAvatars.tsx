import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { HyperTrainContributorSchema } from 'apis/hyper-trains/hyperTrainSchema'
import Image from 'components/styles/Image'

type Props = {
  contributors: HyperTrainContributorSchema[]
  maxDisplay?: number
}

export function HyperTrainContributorAvatars({
  contributors,
  maxDisplay = 5
}: Props) {
  const displayContributors = contributors.slice(0, maxDisplay)
  const remaining = contributors.length - maxDisplay

  return (
    <div className="flex -space-x-2">
      {displayContributors.map((contributor, i) => (
        <Avatar
          key={'contributor-' + i}
          className="size-7 border-2 border-background"
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
              {contributor.name?.charAt(0) ?? '?'}
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
    </div>
  )
}
