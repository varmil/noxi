'use server'

import { fetchAPI } from 'lib/fetchAPI'
import { UpdateGroupRequest } from 'types/group'

export async function updateGroup(
  id: string,
  data: UpdateGroupRequest
): Promise<void> {
  const res = await fetchAPI(`/api/groups/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    cache: 'no-store'
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to update group: ${res.statusText} - ${errorText}`)
  }
}
