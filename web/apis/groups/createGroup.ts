'use server'

import { fetchAPI } from 'lib/fetchAPI'
import { CreateGroupRequest } from 'types/group'

export async function createGroup(data: CreateGroupRequest): Promise<void> {
  const res = await fetchAPI('/api/groups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    cache: 'no-store'
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to create group: ${res.statusText} - ${errorText}`)
  }
}
