import { PropsWithChildren } from 'react'
import { getTranslations } from 'next-intl/server'
import { getCheeredRank } from 'apis/cheer-ticket-usages/getCheeredRank'
import { getCheerTicket } from 'apis/cheer-tickets/getCheerTicket'
import { getGroup } from 'apis/groups'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { MutedCheerStat } from 'components/cheer-stats/MutedCheerStat'
import CountMotion from 'components/styles/number/CountMotion'
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

  let groupName: string
  if (group === 'all') {
    groupName = global('group.all')
  } else {
    const groupData = await getGroup(group)
    groupName = groupData?.name ?? group
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* Avatar, Name, Group, Description */}
        <ChannelProfileSection basicInfo={basicInfo} groupName={groupName}>
          {children}
        </ChannelProfileSection>

        {/* Cheer Button Section */}
        <div className="flex flex-col items-center gap-3 md:mt-2 lg:mt-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <MutedCheerStat
              title={feat('stats.seasonTotal')}
              description={
                <CountMotion value={rank?.usedCount ?? 0}>
                  {feat('profile.cheerCount')}
                </CountMotion>
              }
            />
            <MutedCheerStat
              title={feat('stats.seasonRank')}
              description={
                rank ? (
                  <CountMotion value={rank.rank}>
                    {global('ranking.place', { rank: rank.rank })}
                  </CountMotion>
                ) : (
                  '--'
                )
              }
            />
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
      </div>
    </div>
  )
}
