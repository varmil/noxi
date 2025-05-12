import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'
import { responseListSchema, UserProfilesSchema } from './userProfileSchema'

type Params = {
  userIds: number[]
  orderBy?: {
    field: 'id'
    order: 'asc' | 'desc'
  }
  limit?: number
  offset?: number
}

const createSearchParams = ({ userIds, orderBy, limit, offset }: Params) => {
  const searchParams = new URLSearchParams({
    ...(userIds && { userIds: [...new Set(userIds)].join(',') }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })
  if (orderBy) {
    searchParams.append(`orderBy[field]`, orderBy.field)
    searchParams.append(`orderBy[order]`, orderBy.order)
  }
  return searchParams
}

export async function getUserProfiles(
  params: Params
): Promise<UserProfilesSchema> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(`/api/user-profiles?${searchParams.toString()}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  const data = responseListSchema.parse(await res.json())
  return data.list
}

export async function getUserProfilesCount(
  params: Omit<Params, 'limit' | 'offset'>
): Promise<number> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/user-profiles/count?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1H } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
