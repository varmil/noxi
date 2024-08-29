import { Injectable } from '@nestjs/common'
import axios, { AxiosError } from 'axios'
import HololiveList from '@domain/hololive/hololive'
import { ChannelId } from '@domain/youtube'

const CALLBACK_PATHNAME = `/api/youtube/pubsubhubbub/callback`
const TOPIC_BASE_URL =
  'https://www.youtube.com/xml/feeds/videos.xml?channel_id='

interface SubscribeYouTubePubsubQuery {
  channelId: ChannelId
}

@Injectable()
export class SubscribeService {
  /**
   * Rate Limitがあるので適当にsleepが必要
   */
  async subscribe() {
    for (const channel of HololiveList) {
      await this.send({
        channelId: channel.id
      })
      await this.sleep(2000)
    }
  }

  private async send(query: SubscribeYouTubePubsubQuery): Promise<void> {
    const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME
    const YOUTUBE_PUBSUB_SECRET = process.env.YOUTUBE_PUBSUB_SECRET

    if (!SERVER_HOSTNAME || !YOUTUBE_PUBSUB_SECRET) {
      throw new Error('SERVER_HOSTNAME or YOUTUBE_PUBSUB_SECRET are not set')
    }

    const params = new URLSearchParams({
      'hub.callback': `https://${SERVER_HOSTNAME}${CALLBACK_PATHNAME}`,
      'hub.topic': `${TOPIC_BASE_URL}${query.channelId.get()}`,
      'hub.mode': 'subscribe',
      'hub.secret': YOUTUBE_PUBSUB_SECRET
    })

    try {
      await axios.post(
        'https://pubsubhubbub.appspot.com/subscribe',
        params.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      )
      console.log('Subscription request sent:', query.channelId.get())
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('error status:', error.status, 'message:', error.message)
      }
      throw new Error('Failed to send subscription request')
    }
  }

  /**
   * 指定時間処理を停止する関数
   * @param {number} ms 待機するミリ秒数
   */
  private async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
