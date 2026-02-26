import { ArrowLeft, User } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  getAnonymousPoster,
  getPosterRanking
} from 'apis/hyper-chat-rankings/getPosterRanking'
import { PosterSchema } from 'apis/hyper-chat-rankings/posterRankingSchema'
import { Link } from 'lib/navigation'

type Props = {
  channelId: string
  group: string
}

export async function PosterRankingTemplate({ channelId, group }: Props) {
  const [t, tAnon, posters, anonymousPoster] = await Promise.all([
    getTranslations('Features.hyperChat.posterRanking'),
    getTranslations('Features.hyperChat.anonymous'),
    getPosterRanking(channelId, { limit: 100 }),
    getAnonymousPoster(channelId)
  ])

  const isEmpty = posters.length === 0 && anonymousPoster === null

  return (
    <div className="flex flex-col gap-4 max-w-[550px] mt-8 mx-auto w-full">
      <div className="flex items-center gap-2">
        <Link
          href={`/${group}/channels/${channelId}`}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          prefetch={false}
        >
          <ArrowLeft className="size-4 mt-0.5" />
          {t('backLink')}
        </Link>
      </div>

      <h1 className="text-lg font-semibold">{t('title')}</h1>

      {isEmpty ? (
        <p className="text-muted-foreground text-sm py-8 text-center">
          {t('empty')}
        </p>
      ) : (
        <div className="flex flex-col divide-y">
          {posters.map((poster, index) => (
            <PosterRow key={poster.userId} poster={poster} rank={index + 1} />
          ))}

          {anonymousPoster && (
            <AnonymousRow
              totalAmount={anonymousPoster.totalAmount}
              displayName={tAnon('displayName')}
            />
          )}
        </div>
      )}
    </div>
  )
}

async function PosterRow({
  poster,
  rank
}: {
  poster: PosterSchema
  rank: number
}) {
  const [t, format] = await Promise.all([
    getTranslations('Features.hyperChat.posterRanking'),
    getFormatter()
  ])

  return (
    <div className="flex items-center gap-3 py-3">
      <span className="w-8 text-center text-sm font-medium text-muted-foreground shrink-0">
        {rank}
      </span>
      <Link
        href={`/users/${poster.username}`}
        className="flex items-center gap-3 min-w-0 flex-1 hover:opacity-80 transition-opacity"
        prefetch={false}
      >
        <Avatar className="size-9 shrink-0">
          <AvatarImage src={poster.image} alt={poster.name} />
          <AvatarFallback>
            <User className="size-4" />
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium line-clamp-1 break-all">
          {poster.name}
        </span>
      </Link>
      <span className="text-sm font-semibold shrink-0">
        {t('yenAmount', { amount: format.number(poster.totalAmount) })}
      </span>
    </div>
  )
}

async function AnonymousRow({
  totalAmount,
  displayName
}: {
  totalAmount: number
  displayName: string
}) {
  const [t, format] = await Promise.all([
    getTranslations('Features.hyperChat.posterRanking'),
    getFormatter()
  ])

  return (
    <div className="flex items-center gap-3 py-3">
      <span className="w-8 shrink-0" />
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Avatar className="size-9 shrink-0">
          <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-sm text-muted-foreground truncate">
          {displayName}
        </span>
      </div>
      <span className="text-sm font-semibold shrink-0">
        {t('yenAmount', { amount: format.number(totalAmount) })}
      </span>
    </div>
  )
}
