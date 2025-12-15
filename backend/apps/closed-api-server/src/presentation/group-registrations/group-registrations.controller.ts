import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { CreateGroupRegistrationDto } from '@presentation/group-registrations/dto/CreateGroupRegistration.dto'
import { GetGroupRegistrationsDto } from '@presentation/group-registrations/dto/GetGroupRegistrations.dto'
import { UpdateStatusDto } from '@presentation/group-registrations/dto/UpdateStatus.dto'
import { GroupRegistrationsService } from '@app/group-registrations/group-registrations.service'
import {
  GroupRegistration,
  GroupRegistrationId
} from '@domain/group-registration'

@Controller('group-registrations')
@UseInterceptors(ClassSerializerInterceptor)
export class GroupRegistrationsController {
  constructor(
    private readonly groupRegistrationsService: GroupRegistrationsService
  ) {}

  @Get()
  async findAll(@Query() dto: GetGroupRegistrationsDto) {
    return await this.groupRegistrationsService.findAll({
      limit: dto.toLimit()
    })
  }

  @Post()
  async create(@Body() dto: CreateGroupRegistrationDto) {
    const registration = new GroupRegistration({
      id: new GroupRegistrationId(0), // Will be set by database
      groupId: dto.toGroupId(),
      name: dto.toGroupName(),
      iconSrc: dto.toGroupIconSrc(),
      status: dto.toStatus(),
      appliedAt: dto.toAppliedAt()
    })

    await this.groupRegistrationsService.create(registration)
    return registration
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    const registrationId = new GroupRegistrationId(parseInt(id))
    await this.groupRegistrationsService.updateStatus(
      registrationId,
      dto.toStatus()
    )
    return { message: `Status updated successfully` }
  }
}
