import { Transform } from 'class-transformer'
import { GroupId } from '@domain/group'
import {
  HyperTrainContributors,
  HyperTrainId,
  Level,
  TotalPoint
} from '@domain/hyper-train'
import { ChannelId } from '@domain/youtube'

export class HyperTrain {
  @Transform(({ value }: { value: HyperTrainId }) => value.get())
  public readonly id: HyperTrainId

  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId

  @Transform(({ value }: { value: GroupId }) => value.get())
  public readonly group: GroupId

  @Transform(({ value }: { value: Level }) => value.get())
  public readonly level: Level

  @Transform(({ value }: { value: TotalPoint }) => value.get())
  public readonly totalPoint: TotalPoint

  public readonly startedAt: Date

  public readonly expiresAt: Date

  @Transform(({ value }: { value: HyperTrainContributors }) => value.get())
  public readonly contributors: HyperTrainContributors

  constructor(args: {
    id: HyperTrainId
    channelId: ChannelId
    group: GroupId
    level: Level
    totalPoint: TotalPoint
    startedAt: Date
    expiresAt: Date
    contributors: HyperTrainContributors
  }) {
    this.id = args.id
    this.channelId = args.channelId
    this.group = args.group
    this.level = args.level
    this.totalPoint = args.totalPoint
    this.startedAt = args.startedAt
    this.expiresAt = args.expiresAt
    this.contributors = args.contributors
  }
}
