'use server'

import { fetchAPI } from 'lib/fetchAPI'
import { UpdateGroupRegistrationStatusRequest } from 'types/group'

export async function updateGroupRegistrationStatus(
  id: number,
  data: UpdateGroupRegistrationStatusRequest
): Promise<void> {
  const res = await fetchAPI(`/api/group-registrations/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    cache: 'no-store'
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(
      `Failed to update group registration status: ${res.statusText} - ${errorText}`
    )
  }
}
