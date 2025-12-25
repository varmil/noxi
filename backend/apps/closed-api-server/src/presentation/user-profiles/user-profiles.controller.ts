import {
  Body,
  
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
  
} from '@nestjs/common'
import { JwtAuthGuard } from '@presentation/nestjs/guard/auth/jwt-auth.guard'
import { GetAllProfiles } from '@presentation/user-profiles/dto/GetAllProfiles.dto'
import { PutProfile } from '@presentation/user-profiles/dto/PutProfile.dto'
import { UserProfilesService } from '@app/user-profiles/user-profiles.service'
import { User, UserId } from '@domain/user'
import { Username } from '@domain/user-profile'

@Controller('user-profiles')
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

  @Get('/by-username/:username')
  async getByUsername(@Param('username') username: string) {
    return await this.userProfilesService.findByUsername(new Username(username))
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
        username: dto.toUsername(),
        image: dto.toImage(),
        description: dto.toDescription()
      },
      where: { userId: req.user.id }
    })
  }
}
