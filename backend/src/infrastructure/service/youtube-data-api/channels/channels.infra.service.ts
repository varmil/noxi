import { type youtube_v3, youtube } from '@googleapis/youtube'
import { Injectable } from '@nestjs/common'
import { ChannelIds, Channels } from '@domain/youtube'
import { ChannelTranslator } from '@infra/service/youtube-data-api/channels/ChannelTranslator'

// 一度にリクエストできる最大数
const maxResultsPerRequest = 50

@Injectable()
export class ChannelsInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY
  private readonly client: youtube_v3.Youtube

  constructor() {
    this.client = youtube({
      version: 'v3',
      auth: this.API_KEY
    })
  }

  async list({
    where: { channelIds }
  }: {
    where: { channelIds: ChannelIds }
  }): Promise<Channels> {
    const channels = await this._getChannels(channelIds)
    return new Channels(
      channels
        .map(channel => new ChannelTranslator(channel).translate())
        .filter(e => e !== undefined)
    )
  }

  async _getChannels(channelIds: ChannelIds) {
    let results: youtube_v3.Schema$Channel[] = []

    for (let i = 0; i < channelIds.length; i += maxResultsPerRequest) {
      const batchIds = channelIds.slice(i, i + maxResultsPerRequest)

      const response = await this.client.channels.list({
        part: ['snippet', 'contentDetails', 'statistics', 'brandingSettings'],
        id: batchIds.map(id => id.get())
      })

      results = results.concat(response.data.items ?? [])
    }

    return results
  }
}
