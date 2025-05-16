'use server'

import { unstable_update } from 'lib/auth'
import { fetchAPI } from 'lib/fetchAPI'

type Data = {
  name: string
  image?: string
  description: string
}

export async function saveUserProfile(data: Data): Promise<void> {
  const res = await fetchAPI(`/api/user-profiles/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    throw new Error(`Failed to save user profile: ${res.statusText}`)
  }

  await unstable_update({
    user: {
      name: data.name,
      ...(data.image ? { image: data.image } : {})
    }
  })
}
