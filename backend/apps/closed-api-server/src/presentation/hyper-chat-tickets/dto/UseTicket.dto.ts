import { IsInt, IsString, MaxLength, Min, IsIn  } from 'class-validator'
import { GroupId } from '@domain/group'
import { TIER_CONFIG } from '@domain/hyper-chat'
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
  @MaxLength(60) // free tier max chars
  message: string

  toTicketId = () => new HyperChatTicketId(this.ticketId)

  toChannelId = () => new ChannelId(this.channelId)

  toGroup = () => new GroupId(this.group)

  toGender = () => new Gender(this.gender)

  toMessage = () => {
    const maxChars = TIER_CONFIG['free'].maxChars
    if (this.message.length > maxChars) {
      throw new Error(
        `Message too long for free ticket. Max ${maxChars} characters.`
      )
    }
    return this.message
  }
}
