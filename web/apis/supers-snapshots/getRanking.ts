import { z } from 'zod'
import { CACHE_1W, fetchAPI } from 'lib/fetchAPI'
import { Gender } from 'types/gender'

/** スナップショットランキングのレスポンス型 */
const itemSchema = z.object({
  channelId: z.string(),
  amountMicros: z.string().pipe(z.coerce.bigint()),
  createdAt: z.string()
})

const responseSchema = z.object({
  list: z.array(itemSchema)
})

export type SupersSnapshotRankingItem = z.infer<typeof itemSchema>
export type SupersSnapshotRanking = SupersSnapshotRankingItem[]

type Params = {
  /**
   * 期間種別: 'weekly' または 'monthly'
   */
  period: 'weekly' | 'monthly'
  /**
   * ターゲット: YYYY-Wxx (週) または YYYY-MM (月)
   */
  target: string
  group?: string
  gender?: Gender
  limit?: number
  offset?: number
}

/**
 * スナップショットランキングを取得
 * 過去の週間・月間ランキングは変更されないため、長めのキャッシュを設定
 */
export async function getSupersSnapshotRanking(
  params: Params
): Promise<SupersSnapshotRanking> {
  const { period, target, group, gender, limit, offset } = params

  const searchParams = new URLSearchParams({
    period,
    target,
    ...(group && group !== 'all' && { group }),
    ...(gender && { gender }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  // 過去データは変更されないため1週間キャッシュ
  const res = await fetchAPI(
    `/api/supers-snapshots/ranking?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1W } }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch snapshot ranking: ${await res.text()}`)
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}

const countResponseSchema = z.object({
  count: z.number()
})

/**
 * スナップショットランキングの件数を取得
 */
export async function getSupersSnapshotRankingCount(
  params: Omit<Params, 'limit' | 'offset'>
): Promise<number> {
  const { period, target, group, gender } = params

  const searchParams = new URLSearchParams({
    period,
    target,
    ...(group && group !== 'all' && { group }),
    ...(gender && { gender })
  })

  const res = await fetchAPI(
    `/api/supers-snapshots/ranking/count?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1W } }
  )

  if (!res.ok) {
    throw new Error(
      `Failed to fetch snapshot ranking count: ${await res.text()}`
    )
  }

  const data = countResponseSchema.parse(await res.json())
  return data.count
}
