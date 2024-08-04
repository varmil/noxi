import { Injectable } from '@nestjs/common'
import { ChannelsService } from 'apps/closed-api-server/src/application/youtube/channels/channels.service'
import { VideosService } from 'apps/closed-api-server/src/application/youtube/videos/videos.service'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { ChannelId, Videos } from '@domain/youtube'

@Injectable()
export class ChannelsScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly videosService: VideosService
  ) {}

  async getVideosInChannel({
    where: { channelId }
  }: {
    where: { channelId: ChannelId }
  }): Promise<PaginationResponse<Videos>> {
    const channel = await this.channelsService.findById(channelId)
    if (!channel) return { items: new Videos([]) }

    return await this.videosService.findAll({
      hl: channel.basicInfo.defaultLanguage, // TODO: 本来はフロントエンドからhlを送る
      where: { channel },
      limit: 36
    })
  }
}
