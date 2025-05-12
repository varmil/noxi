import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { JwtAuthGuard } from '@presentation/nestjs/guard/auth/jwt-auth.guard'
import { GetAllProfiles } from '@presentation/user-profiles/dto/GetAllProfiles.dto'
import { PutProfile } from '@presentation/user-profiles/dto/PutProfile.dto'
import { UserProfilesService } from '@app/user-profiles/user-profiles.service'
import { User, UserId } from '@domain/user'

@Controller('user-profiles')
@UseInterceptors(ClassSerializerInterceptor)
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Get('')
  async getAll(@Query() dto: GetAllProfiles) {
    return await this.userProfilesService.findAll({
      where: {
        userIds: dto.toUserIds()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get(':userId')
  async getById(@Param('userId') userId: string) {
    return await this.userProfilesService.findById(new UserId(userId))
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  async save(@Req() req: { user: User }, @Body() dto: PutProfile) {
    return await this.userProfilesService.save({
      data: {
        name: dto.toName(),
        image: dto.toImage(),
        description: dto.toDescription()
      },
      where: { userId: req.user.id }
    })
  }
}
