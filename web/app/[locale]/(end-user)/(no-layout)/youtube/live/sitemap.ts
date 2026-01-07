import { getSupersBundles } from 'apis/supers/getSupersBundles'
import { getEntry } from 'config/sitemap/getEntry'
import type { MetadataRoute } from 'next'

const LIMIT = 5000
// 100万円（micros単位）
const MIN_AMOUNT_MICROS = BigInt(1_000_000 * 1_000_000)

// 100万円以上の配信は年間500-1000件程度と想定
// 余裕を持って5ページ分を用意
export async function generateSitemaps() {
  return [...Array(5)].map((_, i) => ({ id: i }))
}

// Google's limit is 50,000 URLs per sitemap
// 100万円以上のスパチャがあった配信のみをリストアップ
export default async function sitemap({
  id
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const bundles = await getSupersBundles({
    amountMicros: { gte: MIN_AMOUNT_MICROS },
    orderBy: [{ field: 'amountMicros', order: 'desc' }],
    limit: LIMIT,
    offset: id * LIMIT
  })

  return bundles
    .map(bundle => {
      const { videoId, actualEndTime } = bundle

      return getEntry({
        pathname: `/youtube/live/${videoId}`,
        lastModified: actualEndTime ?? undefined
      })
    })
    .filter(e => !!e)
}
