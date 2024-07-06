import { Controller, Post } from '@nestjs/common'
import { CloudSchedulersYoutubeScenario } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.scenario'

/**
 * @IMPORTANT There are no authorization in this controller !
 * This endpoint can only be called from cloud schedulers.
 */
@Controller('cloud-schedulers/youtube')
export class CloudSchedulersYoutubeController {
  constructor(
    private readonly cloudSchedulersYoutubeScenario: CloudSchedulersYoutubeScenario
  ) {}

  @Post('/channels/basic-infos')
  async saveChannels() {
    await this.cloudSchedulersYoutubeScenario.saveChannelBasicInfos()
  }

  // TODO: select appropriate channels to update
  @Post('/videos')
  async saveVideos() {
    await this.cloudSchedulersYoutubeScenario.saveVideos()
  }

  // TODO: select appropriate channels to update
  @Post('/video-aggregations')
  async saveVideoAggregations() {
    await this.cloudSchedulersYoutubeScenario.saveVideoAggregations()
  }

  // TODO: select appropriate channels to update
  // @Post('/video-aggregations')
  // async saveVideoAggregations() {
  //   await this.cloudSchedulersYoutubeScenario.saveVideoAggregations()
  // }
}
