import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { VideosService } from '@app/youtube/videos/videos.service'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { ChannelId, Videos } from '@domain/youtube'

@Injectable()
export class ChannelsScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly videosService: VideosService
  ) {}

  async getVideosInChannel({
    where: { channelId },
    limit
  }: {
    where: { channelId: ChannelId }
    limit?: number
  }): Promise<PaginationResponse<Videos>> {
    const channel = await this.channelsService.findById(channelId)
    if (!channel) return { items: new Videos([]) }

    return await this.videosService.findByChannel({
      hl: channel.peakX?.defaultLanguage, // TODO: 本来はフロントエンドからhlを送る
      where: { channel },
      limit: limit ?? 36
    })
  }
}
