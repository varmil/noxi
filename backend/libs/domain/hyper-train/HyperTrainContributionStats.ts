import { Transform } from 'class-transformer'
import { Point } from '@domain/hyper-train/Point.vo'
import { ParticipationCount } from '@domain/hyper-train/contribution-stats/ParticipationCount.vo'
import { TopContributorCount } from '@domain/hyper-train/contribution-stats/TopContributorCount.vo'
import { ChannelId } from '@domain/youtube'

export class HyperTrainContributionStats {
  @Transform(({ value }: { value: ParticipationCount }) => value.get())
  public readonly participationCount: ParticipationCount

  @Transform(({ value }: { value: TopContributorCount }) => value.get())
  public readonly topContributorCount: TopContributorCount

  @Transform(({ value }: { value: Point }) => value.get())
  public readonly totalPoint: Point

  @Transform(({ value }: { value: ChannelId | null }) => value?.get() ?? null)
  public readonly mostContributedChannelId: ChannelId | null

  @Transform(({ value }: { value: Point }) => value.get())
  public readonly mostContributedChannelPoint: Point

  constructor(args: {
    participationCount: ParticipationCount
    topContributorCount: TopContributorCount
    totalPoint: Point
    mostContributedChannelId: ChannelId | null
    mostContributedChannelPoint: Point
  }) {
    this.participationCount = args.participationCount
    this.topContributorCount = args.topContributorCount
    this.totalPoint = args.totalPoint
    this.mostContributedChannelId = args.mostContributedChannelId
    this.mostContributedChannelPoint = args.mostContributedChannelPoint
  }
}
