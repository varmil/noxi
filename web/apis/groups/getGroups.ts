'use server'

import { GROUPS } from 'apis/tags/revalidate-tags'
import { CACHE_1W, fetchAPI } from 'lib/fetchAPI'
import { groupsResponseSchema, GroupsSchema } from './groupSchema'

export async function getGroups(): Promise<GroupsSchema> {
  const res = await fetchAPI('/api/groups', {
    next: { revalidate: CACHE_1W, tags: [GROUPS] }
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch groups: ${res.statusText}`)
  }

  const data = await res.json()
  return groupsResponseSchema.parse(data)
}
