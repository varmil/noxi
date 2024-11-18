import { VideosSchema } from 'apis/youtube/schema/videoSchema'

/** viewCountがundefinedの動画を除外します */
export function excludeMembersOnly(videos: VideosSchema): VideosSchema {
  return videos.filter(video => !video.membersOnly)
}
