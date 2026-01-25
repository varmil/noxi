import { z } from 'zod'
import { auth } from 'lib/auth'
import dayjs from 'lib/dayjs'

// ISO 8601 = datetime
const schema = z.string().datetime()

export const CACHE_1M = 60
export const CACHE_10M = 600
export const CACHE_1H = 3600
export const CACHE_12H = 3600 * 12
export const CACHE_1D = 86400
export const CACHE_1W = 86400 * 7

export const fetchAPI = async (
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> => {
  const session = await auth()
  const url = roundDate(input)

  // Set default revalidate if init.cache is not set
  if (!init?.cache) {
    if (!init) init = {}
    if (!init.next) init.next = {}
    if (init.next.revalidate === undefined) {
      init.next.revalidate = CACHE_1M
    }
  }

  return await fetch(url.toString(), {
    ...init,
    ...(session
      ? {
          headers: {
            ...init?.headers,
            Authorization: `Bearer ${session?.user.jwtForNestJS}`
          }
        }
      : {})
  })
}

/**
 * Cache HIT率を高めるために秒とミリ秒を丸める
 */
function roundDate(input: string | URL | Request) {
  // input が string または URL の場合に URL オブジェクトを作成
  const url =
    typeof input === 'string'
      ? new URL(input, process.env.BASE_URL)
      : input instanceof URL
      ? input
      : new URL(input.url)

  url.searchParams.forEach((value, key) => {
    if (!value) return

    // 値が有効な Date の場合に秒とミリ秒を丸める
    if (schema.safeParse(value).success) {
      const parsedDate = new Date(value)
      const roundedDate = dayjs(parsedDate)
        .millisecond(0)
        .second(0)
        .toISOString()
      url.searchParams.set(key, roundedDate)
    }
  })

  return url
}
