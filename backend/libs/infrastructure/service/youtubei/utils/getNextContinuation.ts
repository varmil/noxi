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
      if (c.reloadContinuationData) {
        return new Continuation(c.reloadContinuationData.continuation)
      }
      if (c.liveChatReplayContinuationData) {
        return new Continuation(c.liveChatReplayContinuationData.continuation)
      }
    })
    .find(c => c !== undefined)
}
