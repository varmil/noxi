import { MetadataRoute } from 'next'
import { getGroups } from 'apis/youtube/getGroups'
import { getEntry } from 'config/sitemap/getEntry'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  const groupEntries = groups.flatMap(group => {
    return group.channelIds.flatMap(channelId => {
      const path = `/${group.val}/channels/${channelId}`
      return [
        getEntry({ pathname: path }),
        getEntry({ pathname: `${path}/stream-times` }),
        getEntry({ pathname: `${path}/super-chat` })
      ]
    })
  })

  return groupEntries
}
