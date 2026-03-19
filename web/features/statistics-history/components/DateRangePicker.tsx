'use client'

import { useCallback, useState } from 'react'
import { ja, enUS } from 'date-fns/locale'
import { CalendarIcon, LockIcon } from 'lucide-react'
import { useFormatter, useLocale, useTranslations } from 'next-intl'
import { type DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

interface Props {
  start: string
  end: string
  onApply: (start: string, end: string) => void
}

type SpanKey =
  | 'last7days'
  | 'last30days'
  | 'last90days'
  | 'last6months'
  | 'last1year'

interface Preset {
  key: SpanKey
  days: number
}

const PRESETS: Preset[] = [
  { key: 'last7days', days: 7 },
  { key: 'last30days', days: 30 },
  { key: 'last90days', days: 90 },
  { key: 'last6months', days: 180 },
  { key: 'last1year', days: 365 }
]

export function DateRangePicker({ start, end, onApply }: Props) {
  const t = useTranslations('Features.statisticsHistory')
  const format = useFormatter()
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(start),
    to: new Date(end)
  })
  const [activePreset, setActivePreset] = useState<string | null>(() =>
    detectPreset(start, end)
  )

  const handlePreset = useCallback((preset: Preset) => {
    const today = new Date()
    const from = new Date()
    from.setDate(today.getDate() - preset.days)
    setRange({ from, to: today })
    setActivePreset(preset.key)
  }, [])

  const handleApply = useCallback(() => {
    if (range?.from && range?.to) {
      onApply(formatDate(range.from), formatDate(range.to))
    }
    setOpen(false)
  }, [range, onApply])

  const handleCancel = useCallback(() => {
    setRange({ from: new Date(start), to: new Date(end) })
    setActivePreset(null)
    setOpen(false)
  }, [start, end])

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        setRange({ from: new Date(start), to: new Date(end) })
        setActivePreset(detectPreset(start, end))
      }
      setOpen(nextOpen)
    },
    [start, end]
  )

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 sm:px-4 justify-start text-left font-normal gap-2 cursor-pointer"
        >
          <CalendarIcon className="size-4" />
          <span>
            {format.dateTime(new Date(start), {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
            {' - '}
            {format.dateTime(new Date(end), {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Left: Presets */}
          <div className="flex flex-col border-r p-3 gap-1 min-w-[120px] sm:min-w-[150px]">
            {PRESETS.map(preset => (
              <Button
                key={preset.key}
                variant={activePreset === preset.key ? 'default' : 'ghost'}
                size="sm"
                className="justify-start text-sm font-normal"
                onClick={() => handlePreset(preset)}
              >
                {t(`span.${preset.key}`)}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-sm text-muted-foreground"
              disabled
            >
              <LockIcon className="size-3 mr-1" />
              {t('span.all')}
            </Button>
          </div>

          {/* Right: Calendar */}
          <div className="p-1.5 sm:p-3 min-w-[200px] sm:min-w-[300px]">
            <Calendar
              className="w-full"
              mode="range"
              selected={range}
              onSelect={selected => {
                setRange(selected)
                setActivePreset(null)
              }}
              numberOfMonths={1}
              disabled={{ after: new Date() }}
              locale={locale === 'ja' ? ja : enUS}
            />
          </div>
        </div>

        {/* Footer: Cancel / Apply */}
        <div className="flex justify-end gap-2 border-t p-3">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            {t('cancel')}
          </Button>
          <Button size="sm" onClick={handleApply}>
            {t('apply')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function detectPreset(start: string, end: string): string | null {
  const endDate = new Date(end)
  const startDate = new Date(start)
  const diffDays = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  // ±1日の誤差を許容
  return PRESETS.find(p => Math.abs(p.days - diffDays) <= 1)?.key ?? null
}

function formatDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
