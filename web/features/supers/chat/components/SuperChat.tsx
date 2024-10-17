import { PropsWithoutRef } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SuperChatSchema } from 'apis/youtube/schema/superChatSchema'
import SuperTierIcon from 'features/supers/components/SuperTierIcon'

export default async function SuperChat({
  chat
}: PropsWithoutRef<{ chat: SuperChatSchema }>) {
  const {
    amountMicros,
    currency,
    amountDisplayString,
    tier,
    userComment,
    author,
    createdAt
  } = chat

  const format = useFormatter()
  const t = useTranslations('Features.supers')

  return (
    <div className={`flex gap-x-3`}>
      <Avatar className="w-5 h-5 lg:w-8 lg:h-8 mt-1">
        <AvatarImage src={author.profileImageUrl} alt={author.displayName} />
        <AvatarFallback>{author.displayName.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <section className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="text-xs lg:text-sm text-muted-foreground">
              <p className="line-clamp-1">{author.displayName}</p>
              <p>
                {format.dateTime(createdAt, {
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-1 text-lg font-bold tabular-nums">
            <SuperTierIcon tier={tier} />
            <span className="sr-only">{t('amount')}</span>
            {amountDisplayString}
          </div>
        </div>
        <p>{userComment}</p>
      </section>
    </div>
  )
}
