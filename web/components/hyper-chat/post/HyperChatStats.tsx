import { ChevronRight, JapaneseYen, Users } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import CountMotion from 'components/styles/number/CountMotion'
import { Link } from 'lib/navigation'

type Props = {
  totalAmount: number
  posterCount: number
  channelId: string
  group: string
}

export async function HyperChatStats({
  totalAmount,
  posterCount,
  channelId,
  group
}: Props) {
  const t = await getTranslations('Features.hyperChat.stats')

  return (
    <Link
      href={`/${group}/channels/${channelId}/hyper-chat/poster-ranking`}
      className="flex gap-6 hover:opacity-80 transition-opacity"
      prefetch={false}
    >
      {/* Total Amount */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <JapaneseYen className="size-3.5" />
          <span className="text-[11px] leading-none">{t('totalAmount')}</span>
        </div>
        <div className="text-lg font-semibold leading-none">
          <CountMotion value={totalAmount}>{t('yenSuffix')}</CountMotion>
        </div>
      </div>

      {/* Poster Count */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="size-3.5" />
          <span className="text-[11px] leading-none">{t('posterCount')}</span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="text-lg font-semibold leading-none">
            <CountMotion value={posterCount}>{t('peopleSuffix')}</CountMotion>
          </div>
          {posterCount > 0 && <ChevronRight className="size-3.5" />}
        </div>
      </div>
    </Link>
  )
}
