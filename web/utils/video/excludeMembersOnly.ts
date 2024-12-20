import { StreamsSchema } from 'apis/youtube/schema/streamSchema'

/** メンバー限定の動画を除外します */
export function excludeMembersOnly(streams: StreamsSchema): StreamsSchema {
  return streams.filter(stream => !stream.membersOnly)
}
