import { getFormatter, getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUserContributionStats } from 'apis/hyper-trains/getUserContributionStats'
import { getChannels } from 'apis/youtube/getChannels'
import { Link } from 'lib/navigation'

interface Props {
  userId: number
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-3 text-center">
      <p className="text-lg font-bold text-foreground md:text-xl font-mono">
        {value}
      </p>
      <p className="mt-0.5 text-[10px] text-muted-foreground md:text-xs">
        {label}
      </p>
    </div>
  )
}

export async function HyperTrainStatsCards({ userId }: Props) {
  const format = await getFormatter()
  const stats = await getUserContributionStats(userId)
  const t = await getTranslations('Features.userPublicProfile.hyperTrainStats')

  // 最も貢献したチャンネルの情報を取得
  let channelName: string | null = null
  let channelThumbnail: string | null = null
  let channelHref: string | null = null
  if (stats.mostContributedChannelId) {
    const channels = await getChannels({
      ids: [stats.mostContributedChannelId],
      limit: 1
    })
    if (channels.length > 0) {
      const ch = channels[0]
      channelName = ch.basicInfo.title
      channelThumbnail = ch.basicInfo.thumbnails.default?.url ?? null
      channelHref = `/${ch.peakX.group}/channels/${ch.basicInfo.id}`
    }
  }

  return (
    <>
      {/* Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="font-medium text-xs sm:text-sm text-muted-foreground">
          {t('title')}
        </p>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {/* Stats row */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          <StatCard
            label={t('participationCount')}
            value={format.number(stats.participationCount)}
          />
          <StatCard
            label={t('topContributorCount')}
            value={format.number(stats.topContributorCount)}
          />
          <StatCard
            label={t('totalPoint')}
            value={format.number(stats.totalPoint)}
          />
        </div>

        <div className="rounded-lg border bg-card p-3">
          <div className="flex items-center justify-center gap-4">
            {channelName && channelHref ? (
              <Link
                href={channelHref}
                prefetch={false}
                className="flex items-center gap-2 mt-1 hover:opacity-80 transition-opacity"
              >
                <Avatar className="size-8">
                  <AvatarImage
                    src={channelThumbnail ?? undefined}
                    alt={channelName}
                  />
                  <AvatarFallback>{channelName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium line-clamp-1 break-all">
                  {channelName}
                </span>
              </Link>
            ) : (
              <span className="text-lg font-bold">N/A</span>
            )}
          </div>

          <p className="mt-0.5 text-[10px] text-muted-foreground md:text-xs text-center">
            {t('mostContributedTalent')}
          </p>
        </div>
      </div>
    </>
  )
}
