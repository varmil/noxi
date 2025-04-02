import { IsIn } from 'class-validator'
import {
  RankingTypeStrings,
  RankingTypeString,
  RankingType
} from '@domain/ranking'

export class GetSupersBundleRank {
  @IsIn(RankingTypeStrings)
  rankingType: RankingTypeString

  toRankingType = () => new RankingType(this.rankingType)
}
