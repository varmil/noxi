import { IsNotEmpty, IsNumber } from 'class-validator'
import { ExchangeRates } from '@domain/exchange-rate'
import { Currency } from '@domain/lib/currency'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'
import { AmountMicros } from '@domain/supers/base'

export class Tier extends NumberValueObject {
  @IsNotEmpty()
  @IsNumber()
  protected readonly val: number

  /**
   * JPYになおしてTierを計算する
   */
  static readonly calcTier = (
    currency: Currency,
    amountMicros: AmountMicros,
    er: ExchangeRates
  ): Tier => {
    return new Tier(0)
  }

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
