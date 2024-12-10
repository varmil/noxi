import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetSupersBundles } from '@presentation/supers-bundles/dto/GetSupersBundles.dto'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { VideoId } from '@domain/youtube'

@Controller('supers-bundles')
@UseInterceptors(ClassSerializerInterceptor)
export class SupersBundlesController {
  constructor(private readonly supersBundlesService: SupersBundlesService) {}

  @Get()
  async getSupersBundles(@Query() dto: GetSupersBundles) {
    return await this.supersBundlesService.findAll({
      where: {
        videoIds: dto.toVideoIds(),
        channelId: dto.toChannelId(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        actualEndTime: dto.toActualEndTime()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get(':id')
  async getSupersBundle(@Param('id') id: string) {
    const supersBundle = await this.supersBundlesService.findOne({
      where: { videoId: new VideoId(id) }
    })
    if (!supersBundle) {
      throw new NotFoundException(`supersBundle not found for ${id}`)
    }
    return supersBundle
  }
}
