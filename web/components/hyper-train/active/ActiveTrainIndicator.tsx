'use client'

import { Train } from 'lucide-react'
import { HyperTrainSchema } from 'apis/hyper-trains/hyperTrainSchema'
import { HyperTrainContributorAvatars } from 'components/hyper-train/HyperTrainContributorAvatars'
import { HyperTrainLevelBadge } from 'components/hyper-train/HyperTrainLevelBadge'
import { HyperTrainProgressBar } from 'components/hyper-train/HyperTrainProgressBar'
import { HyperTrainTimer } from 'components/hyper-train/HyperTrainTimer'
import { getLevelBorderColor } from 'components/hyper-train/train-styles'

type Props = {
  train: HyperTrainSchema
}

export function ActiveTrainIndicator({ train }: Props) {
  return (
    <div
      className={`w-full rounded-lg border-l-4 ${getLevelBorderColor(train.level)} bg-muted/50 p-3`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Train className="size-4" />
          <HyperTrainLevelBadge level={train.level} size="sm" />
        </div>
        <HyperTrainTimer expiresAt={train.expiresAt} />
      </div>
      <div className="mt-2">
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
    </div>
  )
}
