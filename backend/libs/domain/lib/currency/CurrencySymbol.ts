import { IsNotEmpty } from 'class-validator'
import { Currency } from '@domain/lib/currency/Currency.vo'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class CurrencySymbol extends StringValueObject {
  static readonly JPY = new CurrencySymbol('¥')

  @IsNotEmpty()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }

  ToCurrency(): Currency {
    const symbol = this.val
    switch (symbol) {
      case '$':
        return new Currency('USD')
      case '€':
        return new Currency('EUR')
      case '¥':
        return new Currency('JPY')
      case '£':
        return new Currency('GBP')
      case 'A$':
        return new Currency('AUD')
      case 'CA$':
        return new Currency('CAD')
      case 'HK$':
        return new Currency('HKD')
      case 'NZ$':
        return new Currency('NZD')
      case '₩':
        return new Currency('KRW')
      case 'MX$':
        return new Currency('MXN')
      case '₹':
        return new Currency('INR')
      case 'R$':
        return new Currency('BRL')
      case 'NT$':
        return new Currency('TWD')
      case '₪':
        return new Currency('ILS')
      case '₱':
        return new Currency('PHP')
      case '₫':
        return new Currency('VND')
      case '฿':
        return new Currency('THB')
      case 'F CFA ':
        return new Currency('XAF')
      default:
        // Check if the symbol is a 3-character uppercase string
        if (symbol.length === 3 && /^[A-Z]{3}$/.test(symbol)) {
          return new Currency(symbol)
        }
        throw new Error(`Invalid currency symbol ${symbol}`)
    }
  }
}
