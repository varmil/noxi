import { Trophy, Users, Zap, Calendar } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HyperTrainSchema } from 'apis/hyper-trains/hyperTrainSchema'
import { HyperTrainLevelBadge } from 'components/hyper-train/HyperTrainLevelBadge'
import Image from 'components/styles/Image'

type Props = {
  train: HyperTrainSchema
}

export function HyperTrainBestRecord({ train }: Props) {
  const t = useTranslations('Features.hyperTrain.bestRecord')
  const format = useFormatter()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="size-5 text-yellow-500" />
          {t('title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Max Level Badge */}
        <div className="flex justify-center">
          <HyperTrainLevelBadge level={train.level} size="lg" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Users className="size-4 mx-auto text-muted-foreground mb-1" />
            <div className="text-lg font-bold">{train.contributors.length}</div>
            <div className="text-xs text-muted-foreground">
              {t('participants')}
            </div>
          </div>
          <div>
            <Zap className="size-4 mx-auto text-muted-foreground mb-1" />
            <div className="text-lg font-bold">
              {format.number(train.totalPoint)}
            </div>
            <div className="text-xs text-muted-foreground">
              {t('totalPoints')}
            </div>
          </div>
          <div>
            <Calendar className="size-4 mx-auto text-muted-foreground mb-1" />
            <div className="text-lg font-bold">
              {format.dateTime(new Date(train.startedAt), {
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div className="text-xs text-muted-foreground">{t('date')}</div>
          </div>
        </div>

        {/* Contributor List */}
        {train.contributors.length > 0 && (
          <div>
            <h3 className="text-sm text-muted-foreground mb-3">
              {t('contributorList')}
            </h3>
            <div className="space-y-2">
              {train.contributors.map(contributor => (
                <div
                  key={contributor.userId}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      {contributor.image ? (
                        <Image
                          src={contributor.image}
                          alt={contributor.name ?? ''}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      ) : (
                        <AvatarFallback className="text-xs">
                          {contributor.name?.charAt(0) ?? '?'}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-sm font-medium">
                      {contributor.name ?? '???'}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {format.number(contributor.point)}pt
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
