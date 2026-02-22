import { Calendar, Tickets } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getMyTickets } from 'apis/hyper-chat-tickets/getMyTickets'
import { AnimatedTicketIcon } from 'components/hyper-chat/progress/AnimatedTicketIcon'

export default async function TicketSummary() {
  const [t, format] = await Promise.all([
    getTranslations('Page.dashboard.tickets'),
    getFormatter()
  ])
  const tickets = await getMyTickets()

  const hasTickets = tickets.length > 0
  // findValidByUserId は expiresAt ASC でソート済みなので先頭が最短
  const nearestExpiration = hasTickets ? new Date(tickets[0].expiresAt) : null

  return (
    <Card>
      <CardContent className="pt-6">
        {hasTickets ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <AnimatedTicketIcon size="size-8" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t('remainingTickets')}
                </p>
                <p className="text-4xl font-bold">
                  {t('count', { count: tickets.length })}
                </p>
              </div>
            </div>

            {nearestExpiration && (
              <Badge
                variant="secondary"
                className="w-fit gap-2 px-4 py-2 text-sm"
              >
                <Calendar className="size-4" />
                <span>
                  {t('nearestExpiration')}:{' '}
                  {format.dateTime(nearestExpiration, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </span>
              </Badge>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-4">
              <Tickets className="size-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-muted-foreground">{t('noTickets')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
