import BigNumber from 'bignumber.js'
import { IsNotEmpty } from 'class-validator'
import { AmountMicros, CurrencySymbol } from '@domain/lib/currency'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class PurchaseAmountText extends StringValueObject {
  @IsNotEmpty()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }

  parse(): { symbol: CurrencySymbol; amountMicros: AmountMicros } {
    const amount = this.val

    // 最初の数字のインデックスを見つける
    const index = [...amount].findIndex(ch => /\d/.test(ch))
    if (index === -1)
      throw new Error('[PurchaseAmountText.parse] No number found')

    // 通貨記号と数値部分を分割
    const symbol = amount.slice(0, index).trim()
    let value = amount.slice(index).trim()

    // どちらかが空の場合は無効
    if (!symbol || !value)
      throw new Error('[PurchaseAmountText.parse] symbol or value is empty')

    // カンマを削除
    value = value.replace(/,/g, '')

    // 数値が有効であることを確認
    if (isNaN(parseFloat(value)))
      throw new Error('[PurchaseAmountText.parse] Invalid number')

    return {
      symbol: new CurrencySymbol(symbol),
      amountMicros: new AmountMicros(BigNumber(value).multipliedBy(1_000_000))
    }
  }
}
