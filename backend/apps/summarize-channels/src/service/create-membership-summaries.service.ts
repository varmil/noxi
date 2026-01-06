import { Injectable } from '@nestjs/common'
import { PromiseService } from '@app/lib/promise-service'
import { MembershipBundlesService } from '@app/membership-bundles/membership-bundles.service'
import { MembershipSummariesService } from '@app/membership-summaries/membership-summaries.service'
import { AmountMicros, Now, TargetDate } from '@domain/lib'
import { Period } from '@domain/lib/period'
import { Count } from '@domain/membership'
import { MembershipBundleSums } from '@domain/membership-bundle'
import { MembershipSummary } from '@domain/membership-summary'
import { ChannelId, Channels } from '@domain/youtube/channel'

@Injectable()
export class CreateMembershipSummariesService {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly membershipBundlesService: MembershipBundlesService,
    private readonly membershipSummariesService: MembershipSummariesService
  ) {}

  async execute(channels: Channels): Promise<void> {
    // 深夜バッチ実行のため、JST基準で前日を集計基準日とする
    const targetDate = new TargetDate(new Now().endOfYesterdayJST())
    const channelIds = channels.ids()

    const periods = [
      { key: 'last7Days', date: targetDate.xDaysAgo(7) },
      { key: 'last30Days', date: targetDate.xDaysAgo(30) },
      { key: 'last90Days', date: targetDate.xDaysAgo(90) },
      { key: 'last1Year', date: targetDate.xYearsAgo(1) },
      { key: 'thisWeek', date: targetDate.startOfWeek() },
      { key: 'thisMonth', date: targetDate.startOfMonth() },
      { key: 'thisYear', date: targetDate.startOfyear() }
    ]

    const sumResults = await Promise.all(
      periods.map(period =>
        this.membershipBundlesService.sum({
          where: { createdAt: { gte: period.date }, channelIds }
        })
      )
    )

    const getAmountMicros = (
      data: MembershipBundleSums,
      channelId: ChannelId
    ) => {
      return (
        data.find(c => c.channelId.equals(channelId))?.amountMicros ??
        new AmountMicros(0)
      )
    }
    const getCount = (data: MembershipBundleSums, channelId: ChannelId) => {
      return (
        data.find(c => c.channelId.equals(channelId))?.count ?? new Count(0)
      )
    }

    const promises = channelIds.flatMap(channelId =>
      periods.map((period, index) =>
        this.membershipSummariesService.create({
          data: new MembershipSummary({
            channelId,
            period: new Period(period.key),
            amountMicros: getAmountMicros(sumResults[index], channelId),
            count: getCount(sumResults[index], channelId),
            createdAt: targetDate.get()
          })
        })
      )
    )

    await this.promiseService.allSettled(promises)
  }
}
