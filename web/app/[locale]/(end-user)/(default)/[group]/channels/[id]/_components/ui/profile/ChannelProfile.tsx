import { PropsWithoutRef } from 'react'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { GroupString } from 'config/constants/Group'
import { ChannelProfileContent } from './ChannelProfileContent'

type Props = {
  basicInfo: ChannelSchema['basicInfo']
  group: GroupString
}

export async function ChannelProfile({
  basicInfo,
  group
}: PropsWithoutRef<Props>) {
  return (
    <ChannelProfileContent
      className="pt-4 pb-12 px-4 md:px-0"
      basicInfo={basicInfo}
      group={group}
    >
      <div className="text-sm text-muted-foreground">
        {basicInfo.description}
      </div>
    </ChannelProfileContent>
  )
}
