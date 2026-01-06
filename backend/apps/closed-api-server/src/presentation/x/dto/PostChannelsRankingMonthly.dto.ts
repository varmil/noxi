import { IsIn, IsOptional, IsString } from 'class-validator'
import { GroupId } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'

export class PostChannelsRankingMonthly {
  @IsOptional()
  @IsString()
  group?: string

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

  toGroup = () => (this.group ? new GroupId(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)
}
