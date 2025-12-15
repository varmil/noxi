import { IsIn, IsOptional, IsString } from 'class-validator'
import { GroupName } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'

export class PostChannelsRankingInLast24Hours {
  @IsOptional()
  @IsString()
  group?: string

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

  toGroup = () => (this.group ? new GroupName(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)
}
