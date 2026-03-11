import { UserId } from '@domain/user'
import { Comment } from './Comment.vo'
import { FeatureId } from './FeatureId.vo'

export interface FeatureInterestRepository {
  create(args: {
    userId?: UserId
    featureId: FeatureId
    comment?: Comment
  }): Promise<void>
}
