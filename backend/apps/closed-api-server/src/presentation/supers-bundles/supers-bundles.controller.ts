import BigNumber from 'bignumber.js'
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
import { ChannelIds, VideoId } from '@domain/youtube'
import { GetSupersBundlesSum } from '@presentation/supers-bundles/dto/GetSupersBundlesSum.dto'
import { AmountMicros } from '@domain/supers'
import { SupersBundleSum } from '@domain/supers-bundle'

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

  /** 単一Channel & last 24 hours の集計 */
  @Get('sum')
  async getSupersBundleSum(
    @Query() dto: GetSupersBundlesSum
  ): Promise<SupersBundleSum> {
    const sums = await this.supersBundlesService.sum({
      where: {
        channelIds: new ChannelIds([dto.toChannelId()]),
        actualEndTime: dto.toActualEndTime()
      }
    })
    // データがない＝24時間以内に配信していない or スパチャがゼロ
    // なので、404ではなくゼロ円を意味するデータを返却する
    if (!sums.length) {
      return new SupersBundleSum({
        channelId: dto.toChannelId(),
        amountMicros: new AmountMicros(BigNumber(0))
      })
    }
    return sums[0]
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
