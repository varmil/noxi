import { IsBoolean, IsInt, IsString, Min, IsIn, IsOptional } from 'class-validator'
import { GroupId } from '@domain/group'
import { IsAnonymous, Message } from '@domain/hyper-chat'
import { HyperChatTicketId } from '@domain/hyper-chat-ticket'
import { Gender, GenderString, GenderStrings } from '@domain/lib/gender'
import { ChannelId } from '@domain/youtube'

export class UseTicket {
  @IsInt()
  @Min(1)
  ticketId: number

  @IsString()
  channelId: string

  @IsString()
  group: string

  @IsIn(GenderStrings)
  gender: GenderString

  @IsString()
  message: string

  @IsBoolean()
  @IsOptional()
  isAnonymous?: boolean

  toTicketId = () => new HyperChatTicketId(this.ticketId)

  toChannelId = () => new ChannelId(this.channelId)

  toGroup = () => new GroupId(this.group)

  toGender = () => new Gender(this.gender)

  toMessage = () => new Message(this.message, 'free')

  toIsAnonymous = () => new IsAnonymous(this.isAnonymous)
}
