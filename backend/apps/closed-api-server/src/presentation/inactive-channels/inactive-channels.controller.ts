import { Controller, Delete, Get, Param, Query } from '@nestjs/common'
import { GetInactiveChannelsDto } from '@presentation/inactive-channels/dto/GetInactiveChannels.dto'
import { InactiveChannelsScenario } from '@presentation/inactive-channels/inactive-channels.scenario'
import { ChannelId } from '@domain/youtube'

@Controller('inactive-channels')
export class InactiveChannelsController {
  constructor(private readonly scenario: InactiveChannelsScenario) {}

  @Get()
  async getInactiveChannels(@Query() dto: GetInactiveChannelsDto) {
    return await this.scenario.findInactiveChannels({
      inactiveMonths: dto.toInactiveMonths()
    })
  }

  @Delete(':id')
  async deleteChannel(@Param('id') id: string) {
    await this.scenario.deleteChannelCompletely(new ChannelId(id))
    return { success: true }
  }
}
