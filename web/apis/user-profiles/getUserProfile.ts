'use server'

import { Session } from 'next-auth'
import { UserProfileSchema } from 'apis/user-profiles/userProfileSchema'
import { fetchAPI } from 'lib/fetchAPI'
import { schema } from './userProfileSchema'

export async function getUserProfile(
  userId: Session['user']['id']
): Promise<UserProfileSchema | undefined> {
  const res = await fetchAPI(`/api/user-profiles/${userId}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`)
  }

  const text = await res.text()
  if (!text) {
    return undefined
  } else {
    return schema.parse(JSON.parse(text))
  }
}

export async function getUserProfileByUsername(
  username: string
): Promise<UserProfileSchema | undefined> {
  const res = await fetchAPI(`/api/user-profiles/by-username/${username}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`)
  }

  const text = await res.text()
  if (!text) {
    return undefined
  } else {
    return schema.parse(JSON.parse(text))
  }
}
