import 'server-only'
import BigNumber from 'bignumber.js'
import { getExchangeRates } from 'apis/youtube/getExchangeRates'
import { ExchangeRatesSchema } from 'apis/youtube/schema/exchangeRateSchema'
import { SuperChatsSchema } from 'apis/youtube/schema/superChatSchema'
import { convertMicrosToAmount } from 'utils/amount'

// 金額を日本円に変換する関数
function convertToJPY(
  amount: BigNumber,
  currency: string,
  rates: ExchangeRatesSchema
): BigNumber {
  if (currency === 'JPY') {
    return amount
  }
  const rate = rates.find(r => r.currency === currency)?.rate
  if (!rate) {
    throw new Error(`Unsupported currency: ${currency}`)
  }
  return amount.div(rate)
}

// 集計関数
export async function calculateTotalInJPY(chats: SuperChatsSchema) {
  const rates = await getExchangeRates()
  let totalInJPY = new BigNumber(0)

  for (const chat of chats) {
    const amountInBaseCurrency = convertMicrosToAmount(chat.amountMicros)
    const amountInJPY = convertToJPY(amountInBaseCurrency, chat.currency, rates)
    totalInJPY = totalInJPY.plus(amountInJPY)
  }

  return totalInJPY
}
