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

  @Post('/channels')
  async saveChannels() {
    await this.cloudSchedulersYoutubeScenario.saveChannels()
  }
}
