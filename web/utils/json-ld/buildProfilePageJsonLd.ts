/**
 * VTuber 詳細ページ用 ProfilePage JSON-LD ビルダー
 *
 * Google の「概要ページと詳細ページ」パターンに対応するため、
 * VTuber 詳細ページに ProfilePage + Person 構造化データを追加する
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/profile-page
 */

// ============================================
// Types
// ============================================

type InteractionCounter = {
  '@type': 'InteractionCounter'
  interactionType: string
  userInteractionCount: number
}

type Person = {
  '@type': 'Person'
  name: string
  alternateName?: string
  identifier?: string
  description?: string
  image?: string
  url: string
  sameAs?: string[]
  interactionStatistic?: InteractionCounter[]
}

type ProfilePage = {
  '@context': 'https://schema.org'
  '@type': 'ProfilePage'
  dateCreated?: string
  dateModified?: string
  mainEntity: Person
}

// ============================================
// ProfilePage Builder
// ============================================

export type BuildProfilePageParams = {
  baseUrl: string
  locale: string
  channel: {
    id: string
    title: string
    description: string
    thumbnailUrl: string | undefined
    publishedAt: string
    subscriberCount: number
    group: string
  }
  updatedAt?: string
}

/**
 * VTuber 詳細ページ用 ProfilePage JSON-LD を構築
 *
 * - mainEntity に Person を設定
 * - sameAs で YouTube チャンネルへのリンクを設定
 * - interactionStatistic でフォロワー数を設定
 */
export function buildProfilePage(params: BuildProfilePageParams): ProfilePage {
  const { baseUrl, locale, channel, updatedAt } = params

  const person: Person = {
    '@type': 'Person',
    name: channel.title,
    identifier: channel.id,
    description: truncateDescription(channel.description),
    image: channel.thumbnailUrl,
    url: `${baseUrl}/${locale}/${channel.group}/channels/${channel.id}`,
    sameAs: [`https://www.youtube.com/channel/${channel.id}`],
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/FollowAction',
        userInteractionCount: channel.subscriberCount
      }
    ]
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: channel.publishedAt,
    ...(updatedAt && { dateModified: updatedAt }),
    mainEntity: person
  }
}

/**
 * 説明文を適切な長さに切り詰める（Google 推奨: 5000 文字以内）
 */
function truncateDescription(
  description: string,
  maxLength: number = 1000
): string {
  if (description.length <= maxLength) {
    return description
  }
  return `${description.slice(0, maxLength - 3)}...`
}
