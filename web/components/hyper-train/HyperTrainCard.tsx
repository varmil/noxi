import { Train } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { HyperTrainSchema } from 'apis/hyper-trains/hyperTrainSchema'
import { HyperTrainContributorAvatars } from 'components/hyper-train/HyperTrainContributorAvatars'
import { HyperTrainLevelBadge } from 'components/hyper-train/HyperTrainLevelBadge'
import { HyperTrainProgressBar } from 'components/hyper-train/HyperTrainProgressBar'
import { HyperTrainTimer } from 'components/hyper-train/HyperTrainTimer'
import { getLevelBorderColor } from 'components/hyper-train/train-styles'
import { Link } from 'lib/navigation'

type Props = {
  train: HyperTrainSchema
  channelTitle: string
  channelThumbnailUrl?: string
  href: string
}

export function HyperTrainCard({
  train,
  channelTitle,
  channelThumbnailUrl,
  href
}: Props) {
  const t = useTranslations('Features.hyperTrain.card')
  const format = useFormatter()

  return (
    <Card
      className={`border-l-4 ${getLevelBorderColor(train.level)} overflow-hidden py-0`}
    >
      <CardContent className="p-4">
        <Link href={href} className="flex items-center gap-2 mb-6">
          <Avatar className="size-12 shrink-0">
            <AvatarImage src={channelThumbnailUrl} alt={channelTitle} />
            <AvatarFallback>{channelTitle[0]}</AvatarFallback>
          </Avatar>
          <span className="text-base font-medium line-clamp-1 break-all">
            {channelTitle}
          </span>
        </Link>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Train className="size-5 text-muted-foreground shrink-0" />
            <HyperTrainLevelBadge level={train.level} />
          </div>
          <HyperTrainTimer expiresAt={train.expiresAt} />
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm font-medium">
            {t('totalPoints', {
              points: format.number(train.totalPoint)
            })}
          </span>
          <span className="text-xs text-muted-foreground">
            {t('contributors', {
              count: train.contributors.length
            })}
          </span>
        </div>

        <div className="mt-3">
          <HyperTrainProgressBar
            level={train.level}
            totalPoint={train.totalPoint}
          />
        </div>

        {train.contributors.length > 0 && (
          <div className="mt-3">
            <HyperTrainContributorAvatars contributors={train.contributors} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
