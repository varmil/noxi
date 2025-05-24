import { PropsWithoutRef } from 'react'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { GroupString } from 'config/constants/Group'
import { ChannelProfile } from './ChannelProfile'

type Props = {
  channel: ChannelSchema
}

export async function ChannelProfileTemplate({
  channel
}: PropsWithoutRef<Props>) {
  return (
    <ChannelProfile className="pt-4 pb-12 px-4 md:px-0" channel={channel}>
      <div className="text-sm text-muted-foreground">
        {channel.basicInfo.description}
      </div>
    </ChannelProfile>
  )
}
