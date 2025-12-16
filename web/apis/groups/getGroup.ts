'use server'

import { fetchAPI } from 'lib/fetchAPI'
import { groupSchema, GroupSchema } from './groupSchema'

export async function getGroup(id: string): Promise<GroupSchema | null> {
  const res = await fetchAPI(`/api/groups/${id}`, {
    // next: { revalidate: 86400 } // 1日キャッシュ
    cache: 'no-cache'
  })

  if (res.status === 404) {
    return null
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch group: ${res.statusText}`)
  }

  const data = await res.json()
  return groupSchema.parse(data)
}
