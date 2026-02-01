import { IsIn, IsString, MaxLength } from 'class-validator'
import { GroupId } from '@domain/group'
import { Message, TIER_CONFIG, Tier, TIERS, TierValue } from '@domain/hyper-chat'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'
import { ChannelId } from '@domain/youtube'

export class CreateHyperChatPaymentIntent {
  @IsString()
  channelId: string

  @IsString()
  group: string

  @IsIn(GenderStrings)
  gender: GenderString

  @IsIn(TIERS)
  tier: TierValue

  @IsString()
  @MaxLength(300) // max tier allows 300 chars, empty allowed (無言スパチャ)
  message: string

  toChannelId = () => new ChannelId(this.channelId)

  toGroup = () => new GroupId(this.group)

  toGender = () => new Gender(this.gender)

  toTier = () => new Tier(this.tier)

  toMessage = () => {
    const maxChars = TIER_CONFIG[this.tier].maxChars
    if (this.message.length > maxChars) {
      throw new Error(
        `Message too long for tier ${this.tier}. Max ${maxChars} characters.`
      )
    }
    return new Message(this.message)
  }
}
