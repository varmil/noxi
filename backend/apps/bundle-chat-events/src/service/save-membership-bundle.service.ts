import { Injectable } from '@nestjs/common'
import { MembershipBundlesService } from '@app/membership-bundles/membership-bundles.service'
import { MembershipPricesService } from '@app/membership-prices/membership-prices.service'
import { MembershipsService } from '@app/memberships/memberships.service'
import { GroupName } from '@domain/group'
import { AmountMicros } from '@domain/lib/currency'
import { MembershipBundle } from '@domain/membership-bundle'
import { PriceMicros } from '@domain/membership-price'
import {
  ActualEndTime,
  ActualStartTime,
  ChannelId,
  VideoId
} from '@domain/youtube'

@Injectable()
export class SaveMembershipBundleService {
  constructor(
    private readonly membershipBundlesService: MembershipBundlesService,
    private readonly membershipPricesService: MembershipPricesService,
    private readonly membershipsService: MembershipsService
  ) {}

  async execute({
    videoId,
    actualStartTime,
    actualEndTime,
    channelId,
    group
  }: {
    videoId: VideoId
    actualStartTime?: ActualStartTime
    actualEndTime?: ActualEndTime
    channelId: ChannelId
    group: GroupName
  }) {
    if (!actualStartTime) {
      throw new Error(`actualStartTime not found for ${videoId.get()}`)
    }

    const { amountMicros, count } = await this.calculateTotalInJPY({
      videoId,
      channelId
    })

    await this.membershipBundlesService.save({
      data: new MembershipBundle({
        videoId,
        channelId,
        amountMicros,
        count,
        actualStartTime,
        actualEndTime,
        group
      })
    })
  }

  /**
   * タレントごとに価格設定が異なるので、channelIdからpriceを取得
   * デフォルトは490円として計算する
   */
  private async calculateTotalInJPY({
    videoId,
    channelId
  }: {
    videoId: VideoId
    channelId: ChannelId
  }) {
    const memberships = await this.membershipsService.findAll({
      where: { videoId }
    })
    const count = memberships.countAll()

    const priceMicros =
      (await this.membershipPricesService.findById(channelId))?.priceMicros ??
      new PriceMicros(490 * 1_000_000)

    return {
      amountMicros: new AmountMicros(priceMicros.times(count.get()).get()),
      count
    }
  }
}
