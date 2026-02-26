import { Exclude, Transform } from 'class-transformer'
import { UserId } from '@domain/user'
import { HyperChatTicketId } from './HyperChatTicketId.vo'
import { SourceType } from './SourceType.vo'

export class HyperChatTicket {
  @Transform(({ value }: { value: HyperChatTicketId }) => value.get())
  public readonly id: HyperChatTicketId

  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId

  public readonly expiresAt: Date

  public readonly usedAt: Date | null

  @Transform(({ value }: { value: SourceType }) => value.get())
  public readonly sourceType: SourceType

  public readonly createdAt: Date

  constructor(args: {
    id: HyperChatTicketId
    userId: UserId
    expiresAt: Date
    usedAt: Date | null
    sourceType: SourceType
    createdAt: Date
  }) {
    this.id = args.id
    this.userId = args.userId
    this.expiresAt = args.expiresAt
    this.usedAt = args.usedAt
    this.sourceType = args.sourceType
    this.createdAt = args.createdAt
  }

  @Exclude()
  isValid(): boolean {
    return this.usedAt === null && this.expiresAt > new Date()
  }
}
