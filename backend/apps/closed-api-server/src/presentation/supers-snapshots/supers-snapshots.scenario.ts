import { Injectable } from '@nestjs/common'
import { SupersSnapshotsService } from '@app/supers-snapshots/supers-snapshots.service'
import { GroupId } from '@domain/group'
import { Gender } from '@domain/lib'
import { SnapshotPeriod } from '@domain/supers-snapshot'

@Injectable()
export class SupersSnapshotsScenario {
  constructor(
    private readonly supersSnapshotsService: SupersSnapshotsService
  ) {}

  async getRanking(args: {
    targetDate: Date
    period: SnapshotPeriod
    group?: GroupId
    gender?: Gender
    limit?: number
    offset?: number
  }) {
    const { targetDate, period, group, gender, limit, offset } = args

    const snapshots = await this.supersSnapshotsService.findRanking({
      where: { targetDate, group, gender },
      period,
      limit,
      offset
    })

    return {
      list: snapshots.map(s => ({
        channelId: s.channelId.get(),
        amountMicros: s.amountMicros.toString(),
        createdAt: s.createdAt.toISOString()
      }))
    }
  }
}
