import { GroupsSchema, responseSchema } from 'apis/youtube/schema/groupSchema'
import { fetchAPI } from 'lib/fetchAPI'

export async function getGroups(): Promise<GroupsSchema> {
  const res = await fetchAPI(`/api/groups`, {
    next: { revalidate: 600 }
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
