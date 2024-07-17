import { Controller, Post } from '@nestjs/common'
import {
  CloudSchedulersYoutubeScenario,
  SaveChannelsBySearchScenario
} from '@app/cloud-schedulers/youtube'

/**
 * @IMPORTANT There are no authorization in this controller !
 * This endpoint can only be called from cloud schedulers.
 */
@Controller('cloud-schedulers/youtube')
export class CloudSchedulersYoutubeController {
  constructor(
    private readonly cloudSchedulersYoutubeScenario: CloudSchedulersYoutubeScenario,
    private readonly saveChannelsBySearchScenario: SaveChannelsBySearchScenario
  ) {}

  @Post('/channels/basic-infos')
  async saveChannelsBySearch() {
    await this.saveChannelsBySearchScenario.execute()
  }

  // TODO: deleteme
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
  @Post('/channels')
  async saveChannels() {
    await this.cloudSchedulersYoutubeScenario.saveChannelsByIds()
  }
}
