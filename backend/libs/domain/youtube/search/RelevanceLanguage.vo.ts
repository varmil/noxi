import { IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

/**
 * 日本語: ja
 * 英語: en
 * 韓国語: ko
 * 中国語（簡体字）: zh-CN
 * 中国語（繁体字）: zh-TW
 * フランス語: fr
 * ドイツ語: de
 * スペイン語: es
 * イタリア語: it
 * ロシア語: ru
 * アラビア語: ar
 * ヒンディー語: hi
 * タイ語: th
 * ベトナム語: vi
 * インドネシア語: id
 */
export class RelevanceLanguage extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  protected readonly val: string // ISO 639-1 で規定されている 2 文字の言語コード

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
