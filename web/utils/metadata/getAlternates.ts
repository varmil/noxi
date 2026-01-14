import { Metadata } from 'next'
import { getWebUrl } from 'utils/web-url'

type Args = {
  /** locale を含まないパス名（例: '/ranking/super-chat/channels/all/last30Days'） */
  pathname: string
  /** canonical URL の locale（デフォルト: 'ja'） */
  locale?: string
}

/**
 * hreflang を含む alternates を生成するユーティリティ
 * - canonical: 指定された locale のURL
 * - languages: ja, en, x-default（= ja）
 */
export function getAlternates({
  pathname,
  locale = 'ja'
}: Args): Metadata['alternates'] {
  const baseUrl = getWebUrl()
  const normalizedPathname = pathname === '/' ? '' : pathname

  return {
    canonical: `${baseUrl}/${locale}${normalizedPathname}`,
    languages: {
      ja: `${baseUrl}/ja${normalizedPathname}`,
      en: `${baseUrl}/en${normalizedPathname}`,
      'x-default': `${baseUrl}/ja${normalizedPathname}`
    }
  }
}
