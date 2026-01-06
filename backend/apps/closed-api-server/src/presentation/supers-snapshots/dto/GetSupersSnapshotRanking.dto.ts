import { Type } from 'class-transformer'
import { IsIn, IsInt, IsOptional, IsString, Matches } from 'class-validator'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { GroupId } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'
import { SnapshotPeriod } from '@domain/supers-snapshot'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

export class GetSupersSnapshotRanking {
  @IsIn(['weekly', 'monthly'])
  period: SnapshotPeriod

  /**
   * weekly: 2026-W01 (ISO week)
   * monthly: 2025-07
   */
  @IsString()
  @Matches(/^\d{4}-W\d{2}$|^\d{4}-\d{2}$/, {
    message: 'target must be in format YYYY-Wxx (weekly) or YYYY-MM (monthly)'
  })
  target: string

  @IsOptional()
  @IsString()
  group?: string

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number

  toTargetDate = (): Date => {
    if (this.period === 'weekly') {
      // 2026-W01 → ISO week の最終日（日曜日）の 23:59:59 JST
      const [year, week] = this.target.split('-W').map(Number)
      // ISO week を基準に日付を設定
      return dayjs
        .tz(`${year}-01-01`, 'Asia/Tokyo')
        .isoWeek(week)
        .endOf('isoWeek')
        .toDate()
    } else {
      // 2025-07 → 月末の 23:59:59 JST
      const [year, month] = this.target.split('-').map(Number)
      return dayjs
        .tz(`${year}-${String(month).padStart(2, '0')}-01`, 'Asia/Tokyo')
        .endOf('month')
        .toDate()
    }
  }

  toGroup = () => (this.group ? new GroupId(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)

  toLimit = () => this.limit

  toOffset = () => this.offset
}
