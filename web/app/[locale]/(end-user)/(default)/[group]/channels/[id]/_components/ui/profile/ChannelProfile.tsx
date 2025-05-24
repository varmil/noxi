import { PropsWithChildren } from 'react'
import { getTranslations } from 'next-intl/server'
import { getCheeredRank } from 'apis/cheer-ticket-usages/getCheeredRank'
import { getCheerTicket } from 'apis/cheer-tickets/getCheerTicket'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { ChannelCheerButton } from 'features/cheer-channel/button/ChannelCheerButton'
import { auth } from 'lib/auth'
import dayjs from 'lib/dayjs'
import { ChannelProfileSection } from './ChannelProfileSection'

type Props = {
  channel: ChannelSchema
  className?: string
}

export async function ChannelProfile({
  channel,
  children,
  className
}: PropsWithChildren<Props>) {
  const session = await auth()
  const [global, feat, rank, cheerTicket] = await Promise.all([
    getTranslations('Global'),
    getTranslations('Features.cheerChannel'),
    getCheeredRank({
      channelId: channel.basicInfo.id,
      usedAt: { gte: dayjs().subtract(365, 'days').toDate() } // 便宜的に１年にしておく
    }),
    session ? getCheerTicket() : undefined
  ])
  const {
    basicInfo,
    peakX: { group, gender }
  } = channel

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* Avatar, Name, Group, Description */}
        <ChannelProfileSection basicInfo={basicInfo} group={group}>
          {children}
        </ChannelProfileSection>

        {/* Cheer Button Section */}
        {/* NOTE: リリース時は条件削除 */}
        {session ? (
          <div className="flex flex-col items-center gap-3 md:mt-2 lg:mt-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="min-w-[120px] rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground pb-1.5">
                  {feat('stats.seasonTotal')}
                </p>
                <p className="text-xl font-bold">
                  {feat('profile.cheerCount', {
                    count: rank?.usedCount.toLocaleString() ?? 0
                  })}
                </p>
              </div>
              <div className="min-w-[120px] rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground pb-1.5">
                  {feat('stats.seasonRank')}
                </p>
                <p className="text-xl font-bold">
                  {rank
                    ? `${rank.rank}${global('ranking.place', {
                        rank: rank.rank
                      })}`
                    : '--'}
                </p>
              </div>
            </div>

            <ChannelCheerButton
              session={session}
              cheerTicket={cheerTicket}
              channelId={basicInfo.id}
              channelTitle={basicInfo.title}
              group={group}
              gender={gender}
            />
            {!session && (
              <p className="text-xs text-muted-foreground">
                {feat('profile.signUpForTicket')}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
