import { PropsWithChildren } from 'react'
import { getGroup } from 'apis/groups'
import {
  getHyperChatsSumAmount,
  getHyperChatsUniqueSupporters
} from 'apis/hyper-chats/getHyperChats'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { HyperChatButton } from 'components/hyper-chat/send/HyperChatButton'
import { HyperChatStats } from 'components/hyper-chat/send/HyperChatStats'
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
  const {
    basicInfo,
    peakX: { group: groupId, gender }
  } = channel

  const [group, posterCount, totalAmount] = await Promise.all([
    getGroup(groupId),
    getHyperChatsUniqueSupporters(basicInfo.id),
    getHyperChatsSumAmount(basicInfo.id)
  ])

  if (!group) {
    throw new Error('Group not found for channel profile')
  }
  const groupName = group.name

  return (
    <div className={`@container ${className ?? ''}`}>
      <div className="flex flex-col items-center gap-6 @2xl:flex-row @2xl:items-start">
        {/* Avatar, Name, Group, Description */}
        <ChannelProfileSection
          basicInfo={basicInfo}
          groupId={groupId}
          groupName={groupName}
        >
          {children}
        </ChannelProfileSection>

        {/* HyperChat Stats & Button Section */}
        <div className="min-w-[240px] shrink-0 flex flex-col items-center gap-4 @2xl:mt-6">
          <HyperChatStats
            totalAmount={totalAmount}
            posterCount={posterCount}
          />
          <HyperChatButton
            channelId={basicInfo.id}
            channelTitle={basicInfo.title}
            group={groupId}
            gender={gender}
          />
        </div>
      </div>
    </div>
  )
}
