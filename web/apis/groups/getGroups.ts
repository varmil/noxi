'use server'

import { fetchAPI } from 'lib/fetchAPI'
import { groupsResponseSchema, GroupsSchema } from './groupSchema'

export async function getGroups(): Promise<GroupsSchema> {
  const res = await fetchAPI('/api/groups', {
    cache: 'force-cache' // Groupsは頻繁に変更されないのでキャッシュを使用
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch groups: ${res.statusText}`)
  }

  const data = await res.json()
  return groupsResponseSchema.parse(data)
}
