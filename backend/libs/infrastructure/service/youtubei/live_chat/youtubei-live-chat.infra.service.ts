import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { LiveChatMessages } from '@domain/youtube/live-chat-message'
import { Continuation } from '@domain/youtubei/live-chat'
import { YoutubeiLiveChatTranslator } from '@infra/service/youtubei/live_chat'
import { youtubeiLiveChatAPISchema } from '@infra/service/youtubei/live_chat/YoutubeiLiveChatAPISchema'
import { getNextContinuation } from '@infra/service/youtubei/utils/getNextContinuation'

export interface LiveChatMessagesParams {
  continuation: Continuation
}

// INNERTUBE_API_KEY をここに設定
const API_KEY = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'

// YouTube API リクエスト用のペイロードを作成
function createPayload(continuation: Continuation) {
  return {
    context: {
      gl: 'US',
      hl: 'en',
      client: {
        clientName: 'WEB',
        clientVersion: '2.20241113.07.00' // 適宜変更
      }
    },
    continuation: continuation.get()
  }
}

/**
 * https://www.youtube.com/youtubei/v1/live_chat/get_live_chat
 */
@Injectable()
export class YoutubeiLiveChatInfraService {
  private readonly headers = {
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/130.0.0.0 Safari/537.36'
  }

  constructor() {}

  async list(
    params: LiveChatMessagesParams
  ): Promise<{ nextContinuation?: Continuation; items: LiveChatMessages }> {
    return await this.getLiveChat(params.continuation)
  }

  private async getLiveChat(continuation: Continuation) {
    const response = await fetch(
      `https://www.youtube.com/youtubei/v1/live_chat/get_live_chat?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { ...this.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(createPayload(continuation))
      }
    )
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.statusText} ${await response.text()}`
      )
    }
    const data = this.parse(await response.json())

    const results =
      data.continuationContents?.liveChatContinuation.actions
        ?.map(action =>
          new YoutubeiLiveChatTranslator(
            action.addChatItemAction?.item
          ).translate()
        )
        .filter(e => e !== undefined) ?? []

    return {
      nextContinuation: getNextContinuation(data),
      items: new LiveChatMessages(results)
    }
  }

  private parse(data: unknown) {
    try {
      return youtubeiLiveChatAPISchema.parse(data)
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new TypeError(err.issues.toString())
      } else {
        throw err
      }
    }
  }
}
