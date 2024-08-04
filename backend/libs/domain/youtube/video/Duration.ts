import { IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

/**
 * このプロパティの値は ISO 8601 の期間です。
 * たとえば、長さが 1 分以上で 1 時間未満の動画の場合、再生時間は PT#M#S の形式になります。
 * ここで、PT の文字は値が期間であることを示し、M と S は長さ（分と秒）をそれぞれ示します。
 * 文字 M と S の前にある # 文字はどちらも、動画の分（または秒）を指定する整数です。
 * たとえば、値 PT15M33S は動画の長さが 15 分 33 秒であることを示します。
 * 動画の長さが 1 時間以上の場合、長さは PT#H#M#S の形式になります。H の文字の前にある # は時間数を示します。その他の詳細情報はすべて上記と同じです。動画の長さが 1 日以上の場合、文字 P と T は区切り、値の形式は P#DT#H#M#S になります。
 */
export class Duration extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  protected readonly val: string // ISO8601 Duration

  constructor(val: string) {
    super(val)
    this.val = val
  }

  isShort() {
    return this.toSeconds() <= 60
  }

  // ISO 8601 duration を秒に変換する関数
  private toSeconds(): number {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    const matches = this.val.match(regex)

    const hours = parseInt(matches?.[1] || '0')
    const minutes = parseInt(matches?.[2] || '0')
    const seconds = parseInt(matches?.[3] || '0')

    return hours * 3600 + minutes * 60 + seconds
  }
}
