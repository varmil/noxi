import { PropsWithoutRef } from 'react'
import { CommentThreadsListSchema } from 'apis/youtube/data-api/schema/commentThreadsSchema'
import { getStreams } from 'apis/youtube/getStreams'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import YoutubeComment from 'features/youtube/comment/YoutubeComment'

type Props = PropsWithoutRef<{
  threads: CommentThreadsListSchema
  showStreamLink: boolean
}>

export default async function YoutubeComments({
  threads,
  showStreamLink
}: Props) {
  let streams: StreamsSchema | undefined
  if (showStreamLink) {
    streams = await getStreams({
      videoIds: threads.map(thread => thread.snippet.videoId),
      orderBy: [{ field: 'scheduledStartTime', order: 'asc' }],
      limit: threads.length
    })
  }

  return (
    <>
      {threads.map(thread => (
        <YoutubeComment
          key={thread.id}
          thread={thread}
          stream={streams?.find(s => s.videoId === thread.snippet.videoId)}
        />
      ))}
    </>
  )
}
