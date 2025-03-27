import { CheckCircle2, AlertCircle } from 'lucide-react'
import { ChannelInfo } from '../../_types/channels-add'

export default function RegistrationFormChannelInfo({
  channelInfo
}: {
  channelInfo?: ChannelInfo
}) {
  if (!channelInfo) return null

  return (
    <div className="border rounded-md overflow-hidden max-w-[640px]">
      <div className="flex items-center space-x-4 p-4">
        <img
          src={channelInfo.thumbnail || '/placeholder.svg'}
          alt={channelInfo.title}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium">{channelInfo.title}</h3>
          <p className="text-sm text-muted-foreground">
            チャンネル情報を確認しました
          </p>
        </div>
      </div>

      <div className="border-t bg-muted/20 p-4 space-y-3">
        <h4 className="text-sm font-medium">申請条件</h4>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {channelInfo.meetsSubscriberRequirement ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <div className="flex flex-col sm:flex-row sm:gap-2 text-sm">
              <span>チャンネル登録者数:</span>
              <span>{channelInfo.subscriberCount.toLocaleString()}人</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">1,000人以上必要</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {channelInfo.meetsLiveStreamRequirement ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <div className="flex flex-col sm:flex-row sm:gap-2 text-sm">
              <span>直近30日間のライブ:</span>
              <span>{channelInfo.recentLiveStreams}回</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">4回以上必要</span>
        </div>
      </div>
    </div>
  )
}
