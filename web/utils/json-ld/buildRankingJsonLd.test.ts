import { describe, expect, it } from 'vitest'
import {
  buildBreadcrumbList,
  buildChannelItemList,
  buildStreamItemList,
  BuildBreadcrumbListParams,
  BuildChannelItemListParams,
  BuildStreamItemListParams,
  ChannelForAuthor
} from './buildRankingJsonLd'

describe('buildBreadcrumbList', () => {
  const baseParams: BuildBreadcrumbListParams = {
    baseUrl: 'https://example.com',
    locale: 'ja',
    rankingType: 'channels',
    dimension: 'super-chat',
    group: 'all',
    period: 'last30Days',
    canonicalPeriod: 'last30Days',
    dimensionName: 'スパチャランキング',
    groupName: 'VTuber総合',
    periodName: '過去30日間'
  }

  it('canonical URL（all + canonicalPeriod）では dimension のみ', () => {
    const result = buildBreadcrumbList(baseParams)

    expect(result['@context']).toBe('https://schema.org')
    expect(result['@type']).toBe('BreadcrumbList')
    expect(result.itemListElement).toHaveLength(1)
    expect(result.itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'スパチャランキング',
      item: 'https://example.com/ja/ranking/super-chat/channels/all/last30Days'
    })
  })

  it('group が all 以外の場合は group アイテムを追加', () => {
    const result = buildBreadcrumbList({
      ...baseParams,
      group: 'hololive',
      groupName: 'ホロライブ'
    })

    expect(result.itemListElement).toHaveLength(2)
    expect(result.itemListElement[0].name).toBe('スパチャランキング')
    expect(result.itemListElement[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: 'ホロライブ',
      item: 'https://example.com/ja/ranking/super-chat/channels/hololive/last30Days'
    })
  })

  it('period が canonicalPeriod 以外の場合は period アイテムを追加', () => {
    const result = buildBreadcrumbList({
      ...baseParams,
      period: 'last24Hours',
      periodName: '過去24時間'
    })

    expect(result.itemListElement).toHaveLength(2)
    expect(result.itemListElement[0].name).toBe('スパチャランキング')
    expect(result.itemListElement[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: '過去24時間',
      item: 'https://example.com/ja/ranking/super-chat/channels/all/last24Hours'
    })
  })

  it('group と period の両方が非 canonical の場合は 3 アイテム', () => {
    const result = buildBreadcrumbList({
      ...baseParams,
      group: 'nijisanji',
      groupName: 'にじさんじ',
      period: 'last7Days',
      periodName: '過去7日間'
    })

    expect(result.itemListElement).toHaveLength(3)
    expect(result.itemListElement[0].position).toBe(1)
    expect(result.itemListElement[0].name).toBe('スパチャランキング')
    expect(result.itemListElement[1].position).toBe(2)
    expect(result.itemListElement[1].name).toBe('にじさんじ')
    expect(result.itemListElement[2].position).toBe(3)
    expect(result.itemListElement[2].name).toBe('過去7日間')
  })

  it('live ランキングタイプでも正しい URL を生成', () => {
    const result = buildBreadcrumbList({
      ...baseParams,
      rankingType: 'live',
      dimension: 'concurrent-viewer',
      dimensionName: '同接数ランキング'
    })

    expect(result.itemListElement[0].item).toBe(
      'https://example.com/ja/ranking/concurrent-viewer/live/all/last30Days'
    )
  })
})

describe('buildChannelItemList', () => {
  const baseParams: BuildChannelItemListParams = {
    baseUrl: 'https://example.com',
    locale: 'ja',
    title: 'スパチャランキング',
    description: 'VTuber のスパチャランキングです',
    totalCount: 100,
    currentPage: 1,
    pageSize: 20,
    channels: [
      {
        id: 'ch1',
        title: 'チャンネル1',
        thumbnailUrl: 'https://example.com/thumb1.jpg',
        group: 'hololive'
      },
      {
        id: 'ch2',
        title: 'チャンネル2',
        thumbnailUrl: 'https://example.com/thumb2.jpg',
        group: 'nijisanji'
      }
    ]
  }

  it('ItemList の基本構造を正しく生成', () => {
    const result = buildChannelItemList(baseParams)

    expect(result['@context']).toBe('https://schema.org')
    expect(result['@type']).toBe('ItemList')
    expect(result.name).toBe('スパチャランキング')
    expect(result.description).toBe('VTuber のスパチャランキングです')
    expect(result.itemListOrder).toBe(
      'https://schema.org/ItemListOrderDescending'
    )
    expect(result.numberOfItems).toBe(100)
  })

  it('チャンネルアイテムを正しく生成', () => {
    const result = buildChannelItemList(baseParams)

    expect(result.itemListElement).toHaveLength(2)
    expect(result.itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'チャンネル1',
      image: 'https://example.com/thumb1.jpg',
      url: 'https://example.com/ja/hololive/channels/ch1'
    })
    expect(result.itemListElement[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: 'チャンネル2',
      image: 'https://example.com/thumb2.jpg',
      url: 'https://example.com/ja/nijisanji/channels/ch2'
    })
  })

  it('2ページ目は position が 21 から始まる', () => {
    const result = buildChannelItemList({
      ...baseParams,
      currentPage: 2
    })

    expect(result.itemListElement[0].position).toBe(21)
    expect(result.itemListElement[1].position).toBe(22)
  })

  it('空のチャンネルリストでも正しく動作', () => {
    const result = buildChannelItemList({
      ...baseParams,
      channels: [],
      totalCount: 0
    })

    expect(result.itemListElement).toHaveLength(0)
    expect(result.numberOfItems).toBe(0)
  })
})

describe('buildStreamItemList', () => {
  const channelMap = new Map<string, ChannelForAuthor>([
    [
      'ch1',
      {
        id: 'ch1',
        title: 'チャンネル1',
        thumbnailUrl: 'https://example.com/ch1.jpg',
        group: 'hololive'
      }
    ],
    [
      'ch2',
      {
        id: 'ch2',
        title: 'チャンネル2',
        thumbnailUrl: 'https://example.com/ch2.jpg',
        group: 'nijisanji'
      }
    ]
  ])

  const baseParams: BuildStreamItemListParams = {
    baseUrl: 'https://example.com',
    locale: 'ja',
    title: '同接数ランキング',
    description: 'VTuber の同接数ランキングです',
    totalCount: 50,
    currentPage: 1,
    pageSize: 20,
    streams: [
      {
        videoId: 'vid1',
        title: '配信タイトル1',
        thumbnailUrl: 'https://example.com/vid1.jpg',
        channelId: 'ch1',
        publishedAt: '2024-01-15T10:00:00Z'
      },
      {
        videoId: 'vid2',
        title: '配信タイトル2',
        thumbnailUrl: 'https://example.com/vid2.jpg',
        channelId: 'ch2',
        publishedAt: '2024-01-14T15:30:00Z'
      }
    ],
    channelMap
  }

  it('ItemList の基本構造を正しく生成', () => {
    const result = buildStreamItemList(baseParams)

    expect(result['@context']).toBe('https://schema.org')
    expect(result['@type']).toBe('ItemList')
    expect(result.name).toBe('同接数ランキング')
    expect(result.description).toBe('VTuber の同接数ランキングです')
    expect(result.itemListOrder).toBe(
      'https://schema.org/ItemListOrderDescending'
    )
    expect(result.numberOfItems).toBe(50)
  })

  it('VideoObject + author 構造を正しく生成', () => {
    const result = buildStreamItemList(baseParams)

    expect(result.itemListElement).toHaveLength(2)

    const firstItem = result.itemListElement[0]
    expect(firstItem['@type']).toBe('ListItem')
    expect(firstItem.position).toBe(1)
    expect(firstItem.item['@type']).toBe('VideoObject')
    expect(firstItem.item.name).toBe('配信タイトル1')
    expect(firstItem.item.url).toBe('https://example.com/ja/youtube/live/vid1')
    expect(firstItem.item.thumbnailUrl).toBe('https://example.com/vid1.jpg')
    expect(firstItem.item.uploadDate).toBe('2024-01-15T10:00:00Z')
    expect(firstItem.item.contentUrl).toBe('https://www.youtube.com/watch?v=vid1')
    expect(firstItem.item.author).toEqual({
      '@type': 'Person',
      name: 'チャンネル1',
      url: 'https://example.com/ja/hololive/channels/ch1',
      image: 'https://example.com/ch1.jpg'
    })
  })

  it('チャンネル情報がない場合は author を含めない', () => {
    const result = buildStreamItemList({
      ...baseParams,
      streams: [
        {
          videoId: 'vid3',
          title: '配信タイトル3',
          thumbnailUrl: 'https://example.com/vid3.jpg',
          channelId: 'unknown-channel',
          publishedAt: '2024-01-13T12:00:00Z'
        }
      ],
      channelMap: new Map()
    })

    expect(result.itemListElement[0].item.author).toBeUndefined()
  })

  it('2ページ目は position が 21 から始まる', () => {
    const result = buildStreamItemList({
      ...baseParams,
      currentPage: 2
    })

    expect(result.itemListElement[0].position).toBe(21)
    expect(result.itemListElement[1].position).toBe(22)
  })

  it('空のストリームリストでも正しく動作', () => {
    const result = buildStreamItemList({
      ...baseParams,
      streams: [],
      totalCount: 0
    })

    expect(result.itemListElement).toHaveLength(0)
    expect(result.numberOfItems).toBe(0)
  })
})
