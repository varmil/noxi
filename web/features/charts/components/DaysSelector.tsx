'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { DaysOption } from '../types/chart-filter'

interface Props {
  value: DaysOption
  onChange: (value: DaysOption) => void
}

const OPTIONS: DaysOption[] = [7, 28, 90]

export function DaysSelector({ value, onChange }: Props) {
  const t = useTranslations('Features.charts.filter')

  const getLabel = (days: DaysOption) => {
    switch (days) {
      case 7:
        return t('days7')
      case 28:
        return t('days28')
      case 90:
        return t('days90')
    }
  }

  const isActive = (days: DaysOption) => value === days

  return (
    <div className="flex gap-1">
      {OPTIONS.map(days => (
        <Button
          key={days}
          className={`${isActive(days) ? 'font-bold pointer-events-none' : ''}`}
          variant={isActive(days) ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => onChange(days)}
          aria-label={getLabel(days)}
        >
          {getLabel(days)}
        </Button>
      ))}
    </div>
  )
}
