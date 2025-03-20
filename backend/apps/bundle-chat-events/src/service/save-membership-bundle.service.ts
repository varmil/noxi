import { Injectable } from '@nestjs/common'
import { MembershipBundlesService } from '@app/membership-bundles/membership-bundles.service'
import { MembershipsService } from '@app/memberships/memberships.service'
import { Group } from '@domain/group'
import { AmountMicros } from '@domain/lib/currency'
import { MembershipBundle } from '@domain/membership-bundle'
import {
  ActualEndTime,
  ActualStartTime,
  ChannelId,
  VideoId
} from '@domain/youtube'

@Injectable()
export class SaveMembershipBundleService {
  constructor(
    private readonly membershipsService: MembershipsService,
    private readonly membershipBundlesService: MembershipBundlesService
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
    group: Group
  }) {
    if (!actualStartTime) {
      throw new Error(`actualStartTime not found for ${videoId.get()}`)
    }

    const { amountMicros, count } = await this.calculateTotalInJPY(videoId)

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
   * TODO:
   * 本来タレントごとに価格設定できるがいったん全員
   * 490円として計算する
   */
  private async calculateTotalInJPY(videoId: VideoId) {
    const memberships = await this.membershipsService.findAll({
      where: { videoId }
    })
    const count = memberships.countAll()

    return {
      amountMicros: new AmountMicros(490 * 1_000_000 * count.get()),
      count
    }
  }
}
