import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetChannelRegistrations } from '@presentation/channel-registrations/dto/GetChannelRegistrations.dto'
import { PostChannelRegistration } from '@presentation/channel-registrations/dto/PostChannelRegistration.dto'
import { UpdateStatusDto } from '@presentation/channel-registrations/dto/UpdateStatus.dto'
import { ChannelRegistrationsService } from '@app/channel-registrations/channel-registrations.service'
import { ChannelRegistration } from '@domain/channel-registration'
import { ChannelId } from '@domain/youtube'

@Controller('channel-registrations')
@UseInterceptors(ClassSerializerInterceptor)
export class ChannelRegistrationsController {
  constructor(
    private readonly channelRegistrationsService: ChannelRegistrationsService
  ) {}

  @Get()
  async getChannelRegistrations(@Query() dto: GetChannelRegistrations) {
    return await this.channelRegistrationsService.findAll({
      where: { status: dto.toStatus() },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get(':channelId')
  async getChannelRegistrationById(@Param('channelId') channelId: string) {
    return await this.channelRegistrationsService.findById(
      new ChannelId(channelId)
    )
  }

  @Post()
  async saveChannelRegistration(@Body() dto: PostChannelRegistration) {
    // すでに申請履歴がある && status が approved or done
    // の場合は409を返す
    const existing = await this.channelRegistrationsService.findById(
      dto.toChannelId()
    )
    if (existing?.isApproved() || existing?.isDone()) {
      throw new ConflictException(
        `Channel: ${dto.toChannelId().get()} is already approved or done`
      )
    }

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

  @Put(':channelId/status')
  async updateStatus(
    @Param('channelId') channelId: string,
    @Body() dto: UpdateStatusDto
  ) {
    await this.channelRegistrationsService.updateStatus(
      new ChannelId(channelId),
      dto.toStatus()
    )
    return { message: 'Status updated successfully' }
  }
}
