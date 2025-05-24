'use server'

import { getChannels } from 'apis/youtube/getChannels'
import { ChannelsSchema } from 'apis/youtube/schema/channelSchema'

export async function searchTalents(query: string): Promise<ChannelsSchema> {
  const channels = await getChannels({
    title: query,
    limit: 6
  })
  return channels
}
