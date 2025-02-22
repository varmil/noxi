import { IsIn, IsOptional } from 'class-validator'
import { GroupStrings, GroupString, Group } from '@domain/group'
import { GenderStrings, GenderString, Gender } from '@domain/lib/gender'

export class PostChannelsRankingInLast24Hours {
  @IsIn(GroupStrings)
  @IsOptional()
  group?: GroupString

  @IsIn(GenderStrings)
  @IsOptional()
  gender?: GenderString

  toGroup = () => (this.group ? new Group(this.group) : undefined)

  toGender = () => (this.gender ? new Gender(this.gender) : undefined)
}
