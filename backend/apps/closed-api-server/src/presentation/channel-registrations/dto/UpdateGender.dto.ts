import { IsIn, IsNotEmpty } from 'class-validator'
import { Gender } from '@domain/lib'

const GenderStrings = ['male', 'female'] as const
type GenderString = (typeof GenderStrings)[number]

export class UpdateGenderDto {
  @IsNotEmpty()
  @IsIn(GenderStrings)
  gender: GenderString

  toGender = () => new Gender(this.gender)
}
