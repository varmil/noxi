import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors
} from '@nestjs/common'
import { PostChannelRegistration } from '@presentation/channel-registrations/dto/PostChannelRegistration.dto'
import { ChannelRegistrationsService } from '@app/channel-registrations/channel-registrations.service'
import { ChannelRegistration } from '@domain/channel-registration'

@Controller('channel-registrations')
@UseInterceptors(ClassSerializerInterceptor)
export class ChannelRegistrationsController {
  constructor(
    private readonly channelRegistrationsService: ChannelRegistrationsService
  ) {}

  @Get()
  async getChannelRegistrations() {
    return await this.channelRegistrationsService.findAll()
  }

  @Post()
  async saveChannelRegistration(@Body() dto: PostChannelRegistration) {
    return await this.channelRegistrationsService.save(
      new ChannelRegistration({
        channelId: dto.toChannelId(),
        title: dto.toTitle(),
        country: dto.toCountry(),
        defaultLanguage: dto.toDefaultLanguage(),
        gender: dto.toGender(),
        group: dto.toGroup(),
        subscriberCount: dto.toSubscriberCount(),
        liveStreamCount: dto.toLiveStreamCount(),
        status: dto.toStatus(),
        appliedAt: dto.toAppliedAt()
      })
    )
  }
}
