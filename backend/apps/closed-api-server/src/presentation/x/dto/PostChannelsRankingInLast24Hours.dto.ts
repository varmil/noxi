import { IsIn, IsOptional, IsString } from 'class-validator'
import { Group } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'

export class PostChannelsRankingInLast24Hours {
  @IsOptional()
  @IsString()
  group?: string

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

  toGroup = () => (this.group ? new Group(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)
}
