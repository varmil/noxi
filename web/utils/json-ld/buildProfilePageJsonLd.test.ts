import { describe, expect, it } from 'vitest'
import { buildProfilePage, BuildProfilePageParams } from './buildProfilePageJsonLd'

describe('buildProfilePage', () => {
  const baseParams: BuildProfilePageParams = {
    baseUrl: 'https://example.com',
    locale: 'ja',
    channel: {
      id: 'UC1234567890',
      title: 'テストチャンネル',
      description: 'これはテスト用のチャンネル説明文です。',
      thumbnailUrl: 'https://example.com/thumb.jpg',
      publishedAt: '2020-01-15T10:00:00Z',
      subscriberCount: 1000000,
      group: 'hololive'
    }
  }

  it('ProfilePage の基本構造を正しく生成', () => {
    const result = buildProfilePage(baseParams)

    expect(result['@context']).toBe('https://schema.org')
    expect(result['@type']).toBe('ProfilePage')
    expect(result.dateCreated).toBe('2020-01-15T10:00:00Z')
  })

  it('mainEntity に Person を正しく設定', () => {
    const result = buildProfilePage(baseParams)
    const person = result.mainEntity

    expect(person['@type']).toBe('Person')
    expect(person.name).toBe('テストチャンネル')
    expect(person.identifier).toBe('UC1234567890')
    expect(person.description).toBe('これはテスト用のチャンネル説明文です。')
    expect(person.image).toBe('https://example.com/thumb.jpg')
    expect(person.url).toBe('https://example.com/ja/hololive/channels/UC1234567890')
  })

  it('sameAs に YouTube チャンネル URL を設定', () => {
    const result = buildProfilePage(baseParams)

    expect(result.mainEntity.sameAs).toEqual([
      'https://www.youtube.com/channel/UC1234567890'
    ])
  })

  it('interactionStatistic にフォロワー数を設定', () => {
    const result = buildProfilePage(baseParams)
    const stats = result.mainEntity.interactionStatistic

    expect(stats).toHaveLength(1)
    expect(stats?.[0]).toEqual({
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/FollowAction',
      userInteractionCount: 1000000
    })
  })

  it('updatedAt が指定された場合は dateModified を設定', () => {
    const result = buildProfilePage({
      ...baseParams,
      updatedAt: '2024-12-01T15:30:00Z'
    })

    expect(result.dateModified).toBe('2024-12-01T15:30:00Z')
  })

  it('updatedAt が未指定の場合は dateModified を含めない', () => {
    const result = buildProfilePage(baseParams)

    expect(result.dateModified).toBeUndefined()
  })

  it('長い説明文は 1000 文字で切り詰める', () => {
    const longDescription = 'a'.repeat(2000)
    const result = buildProfilePage({
      ...baseParams,
      channel: {
        ...baseParams.channel,
        description: longDescription
      }
    })

    expect(result.mainEntity.description).toHaveLength(1000)
    expect(result.mainEntity.description?.endsWith('...')).toBe(true)
  })

  it('1000 文字以下の説明文はそのまま保持', () => {
    const shortDescription = 'a'.repeat(500)
    const result = buildProfilePage({
      ...baseParams,
      channel: {
        ...baseParams.channel,
        description: shortDescription
      }
    })

    expect(result.mainEntity.description).toBe(shortDescription)
  })

  it('thumbnailUrl が undefined の場合は image を含めない', () => {
    const result = buildProfilePage({
      ...baseParams,
      channel: {
        ...baseParams.channel,
        thumbnailUrl: undefined
      }
    })

    expect(result.mainEntity.image).toBeUndefined()
  })

  it('英語ロケールでも正しい URL を生成', () => {
    const result = buildProfilePage({
      ...baseParams,
      locale: 'en'
    })

    expect(result.mainEntity.url).toBe(
      'https://example.com/en/hololive/channels/UC1234567890'
    )
  })
})
