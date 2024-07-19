import { Controller, Post } from '@nestjs/common'
import { CloudSchedulersYoutubeScenario } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.scenario'
import { SaveChannelsBySearchScenario } from '@app/cloud-schedulers/youtube/save-channels-by-search.scenario'

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

  @Post('/channels-by-search')
  async saveChannelsBySearch() {
    await this.saveChannelsBySearchScenario.execute()
  }

  // TODO: select appropriate channels to update
  @Post('/video-aggregations')
  async saveVideoAggregations() {
    await this.cloudSchedulersYoutubeScenario.saveVideoAggregations()
  }

  // TODO: select appropriate channels to update
  @Post('/channels-by-ids')
  async saveChannelsByIds() {
    await this.cloudSchedulersYoutubeScenario.saveChannelsByIds()
  }
}
