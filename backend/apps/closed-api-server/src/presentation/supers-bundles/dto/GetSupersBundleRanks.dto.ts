import { Transform } from 'class-transformer'
import { IsArray, IsIn, IsString } from 'class-validator'
import {
  RankingTypeStrings,
  RankingTypeString,
  RankingType
} from '@domain/ranking'
import { VideoId, VideoIds } from '@domain/youtube'

export class GetSupersBundleRanks {
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  videoIds: string[]

  @IsIn(RankingTypeStrings)
  rankingType: RankingTypeString

  toVideoIds = () => new VideoIds(this.videoIds.map(id => new VideoId(id)))

  toRankingType = () => new RankingType(this.rankingType)
}
