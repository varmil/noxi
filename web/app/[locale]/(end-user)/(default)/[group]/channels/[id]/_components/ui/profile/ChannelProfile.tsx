import { PropsWithChildren } from 'react'
import { getCheerTicket } from 'apis/cheer-tickets/getCheerTicket'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { ChannelCheerButton } from 'features/cheer-channel/button/ChannelCheerButton'
import { auth } from 'lib/auth'
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
  const [cheerTicket] = await Promise.all([
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
              gender={gender}
            />
            {!session && (
              <p className="text-xs text-muted-foreground">
                無料の新規登録でチケットを獲得できます
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
