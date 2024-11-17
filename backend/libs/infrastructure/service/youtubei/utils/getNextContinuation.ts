import { z } from 'zod'
import { Continuation } from '@domain/youtubei/live-chat'
import { youtubeiLiveChatAPISchema } from '@infra/service/youtubei/live_chat'

/**
 * Continuation は複数あるので、最初に見つかったものを返す
 */
export function getNextContinuation(
  data: z.infer<typeof youtubeiLiveChatAPISchema>
) {
  const continuations =
    data?.continuationContents?.liveChatContinuation?.continuations

  if (!continuations) return undefined

  return continuations
    .map(c => {
      if (c.timedContinuationData) {
        return new Continuation(c.timedContinuationData.continuation)
      }
      if (c.invalidationContinuationData) {
        return new Continuation(c.invalidationContinuationData.continuation)
      }
      if (c.reload_continuation_data) {
        return new Continuation(c.reload_continuation_data.continuation)
      }
      if (c.live_chat_replay_continuation_data) {
        return new Continuation(
          c.live_chat_replay_continuation_data.continuation
        )
      }
    })
    .find(c => c !== undefined)
}
