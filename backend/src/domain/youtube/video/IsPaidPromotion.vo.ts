import { BooleanValueObject } from '@domain/lib/BooleanValueObject'
import { VideoId } from '@domain/youtube/video/VideoId'

export class IsPaidPromotion extends BooleanValueObject {}

export type IsPaidPromotionObject =
  | {
      videoId: VideoId
      isPaidPromotion: undefined
    }
  | {
      videoId: VideoId
      isPaidPromotion: IsPaidPromotion
    }
