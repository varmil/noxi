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
import { GetSupersBundlesSum } from '@presentation/supers-bundles/dto/GetSupersBundlesSum.dto'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { AmountMicros } from '@domain/lib/currency'
import { SupersBundleSum } from '@domain/supers-bundle'
import { ChannelIds, VideoId } from '@domain/youtube'

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
        amountMicros: dto.toAmountMicros(),
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

  /** last 24 hours の「チャンネルごと」集計 */
  @Get('sum')
  async getSupersBundleSum(
    @Query() dto: GetSupersBundlesSum
  ): Promise<SupersBundleSum> {
    const sum = (
      await this.supersBundlesService.sum({
        where: {
          channelIds: new ChannelIds([dto.toChannelId()]),
          createdAt: dto.toCreatedAt()
        }
      })
    ).first()
    // データがない＝24時間以内に配信していない or スパチャがゼロ
    // なので、404ではなくゼロ円を意味するデータを返却する
    if (!sum) {
      return new SupersBundleSum({
        channelId: dto.toChannelId(),
        amountMicros: new AmountMicros(0)
      })
    }
    return sum
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
