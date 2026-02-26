'use client'

import { useTranslations } from 'next-intl'
import { getLevelProgressColor } from 'components/hyper-train/train-styles'
import {
  getPointsToNextLevel,
  getProgressToNextLevel,
  MAX_LEVEL
} from 'utils/hyper-train/level-config'

type Props = {
  level: number
  totalPoint: number
}

export function HyperTrainProgressBar({ level, totalPoint }: Props) {
  const t = useTranslations('Features.hyperTrain.card')
  const progress = getProgressToNextLevel(level, totalPoint)
  const progressColor = getLevelProgressColor(level)
  const remainingPoints = getPointsToNextLevel(level, totalPoint)
  const isMaxLevel = level >= MAX_LEVEL

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Lv.{level}</span>
        {!isMaxLevel && (
          <span>
            {t('nextLevel', {
              level: level + 1,
              points: remainingPoints.toLocaleString()
            })}
          </span>
        )}
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
