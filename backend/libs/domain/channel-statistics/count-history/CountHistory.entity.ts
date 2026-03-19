import { Transform } from 'class-transformer'
import { CountHistoryDate } from './CountHistoryDate.vo'
import { CountHistoryDiff } from './CountHistoryDiff.vo'
import { CountHistoryTotal } from './CountHistoryTotal.vo'

export class CountHistory {
  @Transform(({ value }: { value: CountHistoryDate }) => value.get())
  public readonly date: CountHistoryDate

  @Transform(({ value }: { value: CountHistoryTotal }) => value.get())
  public readonly total: CountHistoryTotal

  @Transform(({ value }: { value: CountHistoryDiff }) => value.get())
  public readonly diff: CountHistoryDiff

  constructor(args: {
    date: CountHistoryDate
    total: CountHistoryTotal
    diff: CountHistoryDiff
  }) {
    this.date = args.date
    this.total = args.total
    this.diff = args.diff
  }
}
