/**
 * ランキングページ用 JSON-LD ビルダー
 *
 * BreadcrumbList と ItemList を構築する純粋関数
 */

// ============================================
// Types
// ============================================

type BreadcrumbListItem = {
  '@type': 'ListItem'
  position: number
  name: string
  item: string
}

type BreadcrumbList = {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbListItem[]
}

type ChannelItemListItem = {
  '@type': 'ListItem'
  position: number
  name: string
  image: string | undefined
  url: string
}

type VideoObjectAuthor = {
  '@type': 'Person'
  name: string
  url: string
  image: string | undefined
}

type VideoObjectItem = {
  '@type': 'VideoObject'
  name: string
  url: string
  thumbnailUrl: string | undefined
  author?: VideoObjectAuthor
}

type StreamItemListItem = {
  '@type': 'ListItem'
  position: number
  item: VideoObjectItem
}

type ItemListBase = {
  '@context': 'https://schema.org'
  '@type': 'ItemList'
  name: string | null | undefined
  description: string | null | undefined
  itemListOrder: 'https://schema.org/ItemListOrderDescending'
  numberOfItems: number
}

export type ChannelItemList = ItemListBase & {
  itemListElement: ChannelItemListItem[]
}

export type StreamItemList = ItemListBase & {
  itemListElement: StreamItemListItem[]
}

// ============================================
// BreadcrumbList Builder
// ============================================

export type BuildBreadcrumbListParams = {
  baseUrl: string
  locale: string
  rankingType: 'channels' | 'live'
  dimension: string
  group: string
  period: string
  canonicalPeriod: string
  dimensionName: string
  groupName: string
  periodName: string
}

/**
 * BreadcrumbList JSON-LD を構築
 *
 * - group === 'all' の場合、group アイテムをスキップ
 * - period === canonicalPeriod の場合、period アイテムをスキップ
 */
export function buildBreadcrumbList(
  params: BuildBreadcrumbListParams
): BreadcrumbList {
  const {
    baseUrl,
    locale,
    rankingType,
    dimension,
    group,
    period,
    canonicalPeriod,
    dimensionName,
    groupName,
    periodName
  } = params

  const items: BreadcrumbListItem[] = []

  // Position 1: dimension（常に追加）
  items.push({
    '@type': 'ListItem',
    position: items.length + 1,
    name: dimensionName,
    item: `${baseUrl}/${locale}/ranking/${dimension}/${rankingType}/all/${canonicalPeriod}`
  })

  // Position 2: group（all 以外のときのみ追加）
  if (group !== 'all') {
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: groupName,
      item: `${baseUrl}/${locale}/ranking/${dimension}/${rankingType}/${group}/${canonicalPeriod}`
    })
  }

  // Position 3: period（canonicalPeriod 以外のときのみ追加）
  if (period !== canonicalPeriod) {
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: periodName,
      item: `${baseUrl}/${locale}/ranking/${dimension}/${rankingType}/${group}/${period}`
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  }
}

// ============================================
// Channel ItemList Builder
// ============================================

export type ChannelForItemList = {
  id: string
  title: string
  thumbnailUrl: string | undefined
  group: string
}

export type BuildChannelItemListParams = {
  baseUrl: string
  locale: string
  title: string | null | undefined
  description: string | null | undefined
  totalCount: number
  currentPage: number
  pageSize: number
  channels: ChannelForItemList[]
}

/**
 * チャンネルランキング用 ItemList JSON-LD を構築
 */
export function buildChannelItemList(
  params: BuildChannelItemListParams
): ChannelItemList {
  const {
    baseUrl,
    locale,
    title,
    description,
    totalCount,
    currentPage,
    pageSize,
    channels
  } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: totalCount,
    itemListElement: channels.map((channel, index) => ({
      '@type': 'ListItem',
      position: (currentPage - 1) * pageSize + index + 1,
      name: channel.title,
      image: channel.thumbnailUrl,
      url: `${baseUrl}/${locale}/${channel.group}/channels/${channel.id}`
    }))
  }
}

// ============================================
// Stream ItemList Builder (VideoObject + author)
// ============================================

export type StreamForItemList = {
  videoId: string
  title: string
  thumbnailUrl: string | undefined
  channelId: string
}

export type ChannelForAuthor = {
  id: string
  title: string
  thumbnailUrl: string | undefined
  group: string
}

export type BuildStreamItemListParams = {
  baseUrl: string
  locale: string
  title: string | null | undefined
  description: string | null | undefined
  totalCount: number
  currentPage: number
  pageSize: number
  streams: StreamForItemList[]
  channelMap: Map<string, ChannelForAuthor>
}

/**
 * ライブランキング用 ItemList JSON-LD を構築
 *
 * VideoObject + author: Person 構造（Google 公式 Carousel パターン準拠）
 */
export function buildStreamItemList(
  params: BuildStreamItemListParams
): StreamItemList {
  const {
    baseUrl,
    locale,
    title,
    description,
    totalCount,
    currentPage,
    pageSize,
    streams,
    channelMap
  } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: totalCount,
    itemListElement: streams.map((stream, index) => {
      const channel = channelMap.get(stream.channelId)
      return {
        '@type': 'ListItem',
        position: (currentPage - 1) * pageSize + index + 1,
        item: {
          '@type': 'VideoObject',
          name: stream.title,
          url: `${baseUrl}/${locale}/youtube/live/${stream.videoId}`,
          thumbnailUrl: stream.thumbnailUrl,
          ...(channel && {
            author: {
              '@type': 'Person',
              name: channel.title,
              url: `${baseUrl}/${locale}/${channel.group}/channels/${channel.id}`,
              image: channel.thumbnailUrl
            }
          })
        }
      }
    })
  }
}
