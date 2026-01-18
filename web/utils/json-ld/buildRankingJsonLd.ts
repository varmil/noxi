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
  uploadDate: string
  contentUrl: string
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

/**
 * 「概要ページと詳細ページ」パターン用の ListItem 型
 *
 * Google のカルーセル構造化データで、概要ページから詳細ページへリンクする場合、
 * ListItem は @type, position, url の3つのプロパティのみで構成すべき
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/carousel
 */
type SummaryPageItemListItem = {
  '@type': 'ListItem'
  position: number
  url: string
}

export type SummaryPageItemList = ItemListBase & {
  itemListElement: SummaryPageItemListItem[]
}

export type StreamItemList = ItemListBase & {
  itemListElement: StreamItemListItem[]
}

// ============================================
// BreadcrumbList Builder
// ============================================

export type HubPageInfo = {
  name: string
  href: string
}

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
  /** ハブページ情報（存在する場合のみ指定） */
  hubPage?: HubPageInfo
}

/**
 * BreadcrumbList JSON-LD を構築
 *
 * - hubPage が指定された場合、position 1 にハブページを追加
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
    periodName,
    hubPage
  } = params

  const items: BreadcrumbListItem[] = []

  // Position 1: hubPage（存在する場合のみ追加）
  if (hubPage) {
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: hubPage.name,
      item: `${baseUrl}/${locale}${hubPage.href}`
    })
  }

  // Position N: group（all 以外のときのみ追加, ハブページの場合は常に追加）
  if (hubPage || group !== 'all') {
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: groupName,
      item: `${baseUrl}/${locale}/ranking/${dimension}/${rankingType}/${group}/${canonicalPeriod}`
    })
  }

  // Position N: period（canonicalPeriod 以外のときのみ追加）
  if (period !== canonicalPeriod) {
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: periodName,
      item: `${baseUrl}/${locale}/ranking/${dimension}/${rankingType}/${group}/${period}`
    })
  }

  // hubPage がない場合のフォールバック: dimension をトップに追加
  if (!hubPage) {
    items.unshift({
      '@type': 'ListItem',
      position: 1,
      name: dimensionName,
      item: `${baseUrl}/${locale}/ranking/${dimension}/${rankingType}/all/${canonicalPeriod}`
    })
    // position を再計算
    items.forEach((item, index) => {
      item.position = index + 1
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  }
}

/**
 * UI パンくず用のアイテムを構築
 *
 * buildBreadcrumbList と同じロジックを使用
 */
export type UIBreadcrumbItem = {
  name: string
  href: string
}

export function buildUIBreadcrumbItems(
  params: Omit<BuildBreadcrumbListParams, 'baseUrl' | 'locale'>
): UIBreadcrumbItem[] {
  const {
    rankingType,
    dimension,
    group,
    period,
    canonicalPeriod,
    dimensionName,
    groupName,
    periodName,
    hubPage
  } = params

  const items: UIBreadcrumbItem[] = []

  // Position 1: hubPage（存在する場合のみ追加）
  if (hubPage) {
    items.push({
      name: hubPage.name,
      href: hubPage.href
    })
  }

  // Position N: group（all 以外のときのみ追加, ハブページの場合は常に追加）
  if (hubPage || group !== 'all') {
    items.push({
      name: groupName,
      href: `/ranking/${dimension}/${rankingType}/${group}/${canonicalPeriod}`
    })
  }

  // Position N: period（canonicalPeriod 以外のときのみ追加）
  if (period !== canonicalPeriod) {
    items.push({
      name: periodName,
      href: `/ranking/${dimension}/${rankingType}/${group}/${period}`
    })
  }

  // hubPage がない場合のフォールバック: dimension をトップに追加
  if (!hubPage) {
    items.unshift({
      name: dimensionName,
      href: `/ranking/${dimension}/${rankingType}/all/${canonicalPeriod}`
    })
  }

  return items
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
// Summary Page ItemList Builder (概要ページと詳細ページパターン用)
// ============================================

export type BuildSummaryPageItemListParams = {
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
 * 「概要ページと詳細ページ」パターン用 ItemList JSON-LD を構築
 *
 * Google のカルーセル構造化データで、概要ページから詳細ページへリンクする場合、
 * ListItem は @type, position, url の3つのプロパティのみで構成すべき
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/carousel
 */
export function buildSummaryPageItemList(
  params: BuildSummaryPageItemListParams
): SummaryPageItemList {
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
  /** ISO 8601 形式の日時文字列 */
  publishedAt: string
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
          uploadDate: stream.publishedAt,
          contentUrl: `https://www.youtube.com/watch?v=${stream.videoId}`,
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
