import { ChannelsSchema, listSchema } from 'api-schema/youtube/channelSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  searchParams: URLSearchParams
}

export async function getChartOfChannels({
  searchParams
}: Params): Promise<ChannelsSchema> {
  const res = await fetchAPI(
    `/api/youtube/charts/channels?${searchParams.toString()}`
    // {
    //   next: { revalidate: 3600 }
    // }
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = listSchema.parse(await res.json())
  return data.list
}
