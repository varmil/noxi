import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Comment, FeatureId } from '@domain/feature-interest'

export class PostFeatureInterest {
  @IsNotEmpty()
  @IsString()
  featureId: string

  @IsOptional()
  @IsString()
  comment?: string

  toFeatureId = () => new FeatureId(this.featureId)
  toComment = () =>
    this.comment !== undefined ? new Comment(this.comment) : undefined
}
