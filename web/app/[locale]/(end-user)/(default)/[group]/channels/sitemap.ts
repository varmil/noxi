import { MetadataRoute } from 'next'
import { getGroups } from 'apis/youtube/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import dayjs from 'lib/dayjs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  const groupEntries = groups.flatMap(group => {
    return group.channelIds.map(channelId =>
      getEntry({
        pathname: `/${group.val}/channels/${channelId}`,
        lastModified: dayjs().subtract(1, 'day').toDate()
      })
    )
  })

  return groupEntries
}
