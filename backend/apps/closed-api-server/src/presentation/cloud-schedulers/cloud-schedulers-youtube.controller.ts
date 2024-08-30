import { Controller } from '@nestjs/common'

/**
 * @IMPORTANT There are no authorization in this controller !
 * This endpoint can only be called from cloud schedulers.
 */
@Controller('cloud-schedulers/youtube')
export class CloudSchedulersYoutubeController {
  constructor() {}
}
