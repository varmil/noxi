import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'
import { Milestones } from './Milestones.collection'

export class Milestone extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  @Min(10000)
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }

  /** 登録者数から達成済みマイルストーン一覧を算出 */
  static calculateAchieved(subscriberCount: number): Milestones {
    const milestones: Milestone[] = []

    // 1万〜10万: 1万刻み
    for (let m = 10000; m <= 100000 && m <= subscriberCount; m += 10000) {
      milestones.push(new Milestone(m))
    }

    // 20万〜: 10万刻み
    for (let m = 200000; m <= subscriberCount; m += 100000) {
      milestones.push(new Milestone(m))
    }

    return new Milestones(milestones)
  }

  format(): string {
    return this.val.toLocaleString()
  }
}
