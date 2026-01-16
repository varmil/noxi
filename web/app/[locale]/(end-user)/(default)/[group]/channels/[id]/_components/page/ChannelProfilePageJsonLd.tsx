import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import {
  buildProfilePage,
  BuildProfilePageParams
} from 'utils/json-ld/buildProfilePageJsonLd'
import { getWebUrl } from 'utils/web-url'

type Props = {
  locale: string
  channel: ChannelSchema
}

/**
 * VTuber 詳細ページ用 ProfilePage JSON-LD コンポーネント
 *
 * Google の「概要ページと詳細ページ」カルーセルパターンに対応するため、
 * 詳細ページに ProfilePage + Person 構造化データを追加する
 */
export function ChannelProfilePageJsonLd({ locale, channel }: Props) {
  const baseUrl = getWebUrl()

  const params: BuildProfilePageParams = {
    baseUrl,
    locale,
    channel: {
      id: channel.basicInfo.id,
      title: channel.basicInfo.title,
      description: channel.basicInfo.description,
      thumbnailUrl:
        channel.basicInfo.thumbnails.high?.url ??
        channel.basicInfo.thumbnails.default?.url,
      publishedAt: channel.basicInfo.publishedAt,
      subscriberCount: channel.statistics.subscriberCount,
      group: channel.peakX.group
    },
    updatedAt: channel.updatedAt
  }

  const profilePage = buildProfilePage(params)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
    />
  )
}
