import { Transform } from 'class-transformer'
import { HyperChatId } from '@domain/hyper-chat'
import { HyperChatLikeId } from '@domain/hyper-chat-like'
import { UserId } from '@domain/user'

export class HyperChatLike {
  @Transform(({ value }: { value: HyperChatLikeId }) => value.get())
  public readonly id: HyperChatLikeId

  @Transform(({ value }: { value: HyperChatId }) => value.get())
  public readonly hyperChatId: HyperChatId

  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId

  public readonly createdAt: Date

  constructor(args: {
    id: HyperChatLikeId
    hyperChatId: HyperChatId
    userId: UserId
    createdAt: Date
  }) {
    this.id = args.id
    this.hyperChatId = args.hyperChatId
    this.userId = args.userId
    this.createdAt = args.createdAt
  }
}
