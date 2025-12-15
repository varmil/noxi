'use server'

import { fetchAPI } from 'lib/fetchAPI'

export async function deleteGroup(id: string): Promise<void> {
  const res = await fetchAPI(`/api/groups/${id}`, {
    method: 'DELETE',
    cache: 'no-store'
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to delete group: ${res.statusText} - ${errorText}`)
  }
}
