/**
 * BigInt対応のカスタムシリアライザ
 *
 * Keyvのキャッシュストレージで使用するためのシリアライザ。
 * BigInt値を {__bigint__: "value"} 形式でJSON保存し、
 * 復元時に自動的にBigIntへ変換する。
 */

interface DeserializedData<Value> {
  value?: Value
  expires?: number | undefined
}

export const serialize = <Value>(data: DeserializedData<Value>): string => {
  return JSON.stringify(data, (_key, value: unknown) =>
    typeof value === 'bigint' ? { __bigint__: value.toString() } : value
  )
}

export const deserialize = <Value>(
  data: string
): DeserializedData<Value> | undefined => {
  return JSON.parse(data, (_key, value: unknown) => {
    if (
      value &&
      typeof value === 'object' &&
      '__bigint__' in value &&
      typeof (value as { __bigint__: unknown }).__bigint__ === 'string'
    ) {
      return BigInt((value as { __bigint__: string }).__bigint__)
    }
    return value
  }) as DeserializedData<Value>
}
