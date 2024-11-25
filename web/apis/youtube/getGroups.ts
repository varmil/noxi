import { GroupsSchema, responseSchema } from 'apis/youtube/schema/groupSchema'
import { fetchAPI } from 'lib/fetchAPI'

export async function getGroups(): Promise<GroupsSchema> {
  const res = await fetchAPI(`/api/groups`, {
    next: { revalidate: 3600 * 24 }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
