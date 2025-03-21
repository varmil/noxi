import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetMembershipBundles } from '@presentation/membership-bundles/dto/GetMembershipBundles.dto'
import { MembershipBundlesService } from '@app/membership-bundles/membership-bundles.service'
import { VideoId } from '@domain/youtube'

@Controller('membership-bundles')
@UseInterceptors(ClassSerializerInterceptor)
export class MembershipBundlesController {
  constructor(
    private readonly membershipBundlesService: MembershipBundlesService
  ) {}

  @Get()
  async getMembershipBundles(@Query() dto: GetMembershipBundles) {
    return await this.membershipBundlesService.findAll({
      where: {
        videoIds: dto.toVideoIds(),
        channelId: dto.toChannelId(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        actualEndTime: dto.toActualEndTime(),
        createdAt: dto.toCreatedAt()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get(':id')
  async getMembershipBundle(@Param('id') id: string) {
    const membershipBundle = await this.membershipBundlesService.findOne({
      where: { videoId: new VideoId(id) }
    })
    if (!membershipBundle) {
      throw new NotFoundException(`membershipBundle not found for ${id}`)
    }
    return membershipBundle
  }
}
