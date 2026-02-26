import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import {
  ModerationStatus,
  ModerationStatusValue,
  MODERATION_STATUSES
} from '@domain/hyper-chat-moderation'

export class UpsertHyperChatModeration {
  @IsNotEmpty()
  @IsString()
  @IsIn(MODERATION_STATUSES)
  status: ModerationStatusValue

  toModerationStatus = () => new ModerationStatus(this.status)
}
