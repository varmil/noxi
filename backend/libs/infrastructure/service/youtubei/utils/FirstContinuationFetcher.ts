import axios from 'axios'
import { VideoId } from '@domain/youtube'
import { Continuation } from '@domain/youtubei/live-chat'

interface Options {
  key: string
  continuation: Continuation
  visitorData: string
  clientVersion: string
}

/**
 * ref: https://drroot.page/wp/?p=227
 */
export class FirstContinuationFetcher {
  private chatUri = 'https://www.youtube.com/live_chat'
  private headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
  }

  /**
   * continuation, INNERTUBE_API_KEYを取得
   */
  async fetch(videoId: VideoId): Promise<Options> {
    const res = await axios.get(this.chatUri, {
      headers: this.headers,
      params: { v: videoId.get() }
    })

    const html: string = res.data as string

    const matchedKey = this.extractMatch(html, /"INNERTUBE_API_KEY":"(.+?)"/)
    const matchedCtn = this.extractMatch(html, /"continuation":"(.+?)"/)
    const matchedVisitor = this.extractMatch(html, /"visitorData":"(.+?)"/)
    const matchedClient = this.extractMatch(html, /"clientVersion":"(.+?)"/)

    const ret: Options | undefined =
      matchedKey && matchedCtn && matchedVisitor && matchedClient
        ? {
            key: matchedKey,
            continuation: new Continuation(matchedCtn),
            visitorData: matchedVisitor,
            clientVersion: matchedClient
          }
        : undefined

    if (!ret)
      throw new Error(
        `Failed to fetch FirstContinuation: Maybe the Live Stream is already ended. videoId: ${videoId.get()}`
      )
    return ret
  }

  /**
   * 正規表現でマッチした結果を取得
   * @param input 対象文字列
   * @param regex 正規表現
   */
  private extractMatch(input: string, regex: RegExp): string | undefined {
    const match = input.match(regex)
    return match && match[1] ? match[1] : undefined
  }
}
