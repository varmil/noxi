import { PropsWithoutRef } from 'react'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { ChannelProfileContent } from './ChannelProfileContent'

type Props = {
  basicInfo: ChannelSchema['basicInfo']
}

export async function ChannelProfile({ basicInfo }: PropsWithoutRef<Props>) {
  return (
    <ChannelProfileContent basicInfo={basicInfo}>
      <div className="text-sm text-muted-foreground">
        {basicInfo.description}
      </div>
    </ChannelProfileContent>
  )
}
