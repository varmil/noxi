import { CacheTTL } from '@nestjs/cache-manager'
import { Controller, Get, Query } from '@nestjs/common'
import { GetSupersSnapshotRanking } from '@presentation/supers-snapshots/dto/GetSupersSnapshotRanking.dto'
import { SupersSnapshotsScenario } from '@presentation/supers-snapshots/supers-snapshots.scenario'

@Controller('supers-snapshots')
export class SupersSnapshotsController {
  constructor(
    private readonly supersSnapshotsScenario: SupersSnapshotsScenario
  ) {}

  /**
   * GET /supers-snapshots/ranking?period=weekly&target=2026-W01&group=hololive
   * GET /supers-snapshots/ranking?period=monthly&target=2025-07&group=hololive
   */
  @Get('/ranking')
  @CacheTTL(7 * 24 * 3600 * 1000) // 1 week - 過去データは変更されないため長めに設定
  async getRanking(@Query() dto: GetSupersSnapshotRanking) {
    return await this.supersSnapshotsScenario.getRanking({
      targetDate: dto.toTargetDate(),
      period: dto.period,
      group: dto.toGroup(),
      gender: dto.toGender(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  /**
   * GET /supers-snapshots/ranking/count?period=weekly&target=2026-W01&group=hololive
   */
  @Get('/ranking/count')
  @CacheTTL(7 * 24 * 3600 * 1000) // 1 week
  async countRanking(@Query() dto: GetSupersSnapshotRanking) {
    return await this.supersSnapshotsScenario.countRanking({
      targetDate: dto.toTargetDate(),
      period: dto.period,
      group: dto.toGroup(),
      gender: dto.toGender()
    })
  }
}
