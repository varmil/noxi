import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'

const FETCH_LIMIT = 50

@Injectable()
export class CloudSchedulersYoutubeScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly channelsInfraService: ChannelsInfraService
  ) {}

  /**
   * ondemand, batch
   *
   * ondemand
   * このシナリオをオンデマンドの「単一CH」更新でも使う
   * usecase: ユーザーがヒカキンのチャンネルページを開いた際に更新リクエストを送る
   *          GET /v3/channels?channelId=XXX
   *
   *
   * batch
   * こっちはTOP10,000のチャンネル更新、などIdがわかってる場合の更新に用いる
   * GET /v3/channels?channelId=A,B,C...
   */
  async saveChannelsByIds() {
    const channelIds = await this.channelsService.findIds({
      limit: FETCH_LIMIT
    })

    const channels = await this.channelsInfraService.list({
      where: { channelIds }
    })

    await Promise.all(
      channels.map(async channel => {
        await this.channelsService.save(channel)
      })
    )
  }

  /**
   * batch
   *
   * TODO: Impl
   */
  async saveChannelCategory() {}
}
