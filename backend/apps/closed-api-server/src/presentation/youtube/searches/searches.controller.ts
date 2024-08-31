import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager'
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { SearchVideosDto } from '@presentation/youtube/searches/dto/SearchVideos.dto'
import { SearchesScenario } from '@app/youtube/searches/searches.scenario'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { Videos } from '@domain/youtube'

/**
 *
 * # 検索（Searches）
 *      /youtube/searches/channels
 *      /youtube/searches/videos
 */
@Controller('youtube/searches')
@UseInterceptors(CacheInterceptor)
@CacheTTL(600 * 1000)
export class SearchesController {
  constructor(private readonly searchesScenario: SearchesScenario) {}

  /**
   * 特定のクエリで動画を検索する
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/videos')
  async searchVideos(
    @Query() dto: SearchVideosDto
  ): Promise<PaginationResponse<Videos>> {
    console.log('dto', dto)

    return await this.searchesScenario.searchVideos({
      q: dto.toQ(),
      limit: dto.limit,
      order: dto.order,
      publishedBefore: dto.toPublishedBefore(),
      publishedAfter: dto.toPublishedAfter(),
      channelId: dto.toChannelId(),
      regionCode: dto.toCountryCode(),
      relevanceLanguage: dto.toRelevanceLanguage()
    })
  }
}
