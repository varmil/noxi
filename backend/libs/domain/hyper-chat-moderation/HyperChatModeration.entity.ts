import { Transform } from 'class-transformer'
import { HyperChatId } from '@domain/hyper-chat'
import { ModerationStatus } from './ModerationStatus.vo'

export class HyperChatModeration {
  @Transform(({ value }: { value: HyperChatId }) => value.get())
  public readonly hyperChatId: HyperChatId

  @Transform(({ value }: { value: ModerationStatus }) => value.get())
  public readonly status: ModerationStatus

  public readonly createdAt: Date

  public readonly updatedAt: Date

  constructor(args: {
    hyperChatId: HyperChatId
    status: ModerationStatus
    createdAt: Date
    updatedAt: Date
  }) {
    this.hyperChatId = args.hyperChatId
    this.status = args.status
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
  }
}
