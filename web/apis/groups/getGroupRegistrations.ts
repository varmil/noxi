'use server'

import { fetchAPI } from 'lib/fetchAPI'
import {
  groupRegistrationsResponseSchema,
  GroupRegistrationsSchema
} from './groupSchema'

export async function getGroupRegistrations(
  limit?: number
): Promise<GroupRegistrationsSchema> {
  const url = new URL('/api/group-registrations', process.env.BASE_URL)
  if (limit) {
    url.searchParams.set('limit', limit.toString())
  }

  const res = await fetchAPI(url.toString(), {
    cache: 'no-store' // 申請履歴は最新の状態を取得
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch group registrations: ${res.statusText}`)
  }

  const data = await res.json()
  return groupRegistrationsResponseSchema.parse(data)
}
