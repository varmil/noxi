import { PropsWithChildren } from 'react'
import { getCheerTicket } from 'apis/cheer-tickets/getCheerTicket'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { GroupString } from 'config/constants/Group'
import { ChannelCheerButton } from 'features/cheer-channel/button/ChannelCheerButton'
import { auth } from 'lib/auth'
import { ChannelProfileSection } from './ChannelProfileSection'

type Props = {
  basicInfo: ChannelSchema['basicInfo']
  group: GroupString
  className?: string
}

export async function ChannelProfile({
  basicInfo,
  group,
  children,
  className
}: PropsWithChildren<Props>) {
  const session = await auth()
  const [cheerTicket] = await Promise.all([
    session ? getCheerTicket() : undefined
  ])

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* Avatar, Name, Group, Description */}
        <ChannelProfileSection basicInfo={basicInfo} group={group}>
          {children}
        </ChannelProfileSection>

        {/* Cheer Button Section */}
        <div className="flex flex-col items-center gap-3 md:mt-2 lg:mt-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground pb-1.5">
                過去30日間の応援
              </p>
              <p className="text-xl font-bold">1,245回</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground pb-1.5">
                応援ランキング
              </p>
              <p className="text-xl font-bold">3位</p>
            </div>
          </div>

          <ChannelCheerButton
            session={session}
            cheerTicket={cheerTicket}
            channelId={basicInfo.id}
            channelTitle={basicInfo.title}
            group={group}
          />
          {!session && (
            <p className="text-xs text-muted-foreground">
              無料の新規登録でチケットを獲得できます
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
