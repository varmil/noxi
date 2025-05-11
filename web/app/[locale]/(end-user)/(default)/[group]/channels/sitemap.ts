import { MetadataRoute } from 'next'
import { getChannels } from 'apis/youtube/getChannels'
import { getGroups } from 'apis/youtube/getGroups'
import { getEntry } from 'config/sitemap/getEntry'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  const promises = groups.flatMap(async group => {
    const channels = await getChannels({ group: group.val })
    return channels.flatMap(channel => {
      const path = `/${group.val}/channels/${channel.basicInfo.id}`
      return [getEntry({ pathname: path, lastModified: new Date() })]
    })
  })

  const entries = await Promise.all(promises)
  return entries.flat()
}
