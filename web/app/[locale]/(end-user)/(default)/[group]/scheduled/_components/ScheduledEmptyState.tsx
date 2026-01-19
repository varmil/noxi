import { CalendarOff } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function ScheduledEmptyState() {
  const t = await getTranslations('Features.schedule')

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <CalendarOff className="h-8 w-8 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">{t('noStreams')}</p>
    </div>
  )
}
