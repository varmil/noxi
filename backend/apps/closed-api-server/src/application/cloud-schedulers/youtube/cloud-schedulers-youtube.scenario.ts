import { Injectable, NotImplementedException } from '@nestjs/common'
import { ChannelsService } from 'apps/closed-api-server/src/application/youtube/channels/channels.service'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'

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
  saveChannelsByIds() {
    throw new NotImplementedException()
  }

  /**
   * batch
   */
  saveChannelCategory() {
    throw new NotImplementedException()
  }
}
