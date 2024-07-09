import { IsISO31661Alpha2, IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

/**
 * 日本: JP
 * アメリカ合衆国: US
 *
 * インドネシア: ID
 * タイ: TH
 * マレーシア: MY
 * シンガポール: SG
 * フィリピン: PH
 * ベトナム: VN
 *
 * イギリス: GB
 * カナダ: CA
 * フランス: FR
 * ドイツ: DE
 * オーストラリア: AU
 * 中国: CN
 * インド: IN
 * 韓国: KR
 */
export class RegionCode extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @IsISO31661Alpha2()
  protected readonly val: string // ISO 3166-1 alpha-2

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
