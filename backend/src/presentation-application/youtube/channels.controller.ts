import { Controller, Get } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels.service'

@Controller('youtube/channels')
export class ChannelsController {
  constructor(private readonly appService: ChannelsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
