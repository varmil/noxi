import BigNumber from 'bignumber.js'

/** 標準的な金額単位に変換する */
export function convertMicrosToAmount(amountMicros: bigint): BigNumber {
  return new BigNumber(amountMicros.toString()).div(1_000_000)
}

/** amountMicros を整数に丸めた金額としてロケールフォーマットされた文字列を返す */
export function formatMicrosAsRoundedAmount(amountMicros: bigint): string {
  return Math.round(
    convertMicrosToAmount(amountMicros).toNumber()
  ).toLocaleString()
}
