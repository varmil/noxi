import 'server-only'
import BigNumber from 'bignumber.js'
import { SuperChatsSchema } from 'apis/youtube/schema/superChatSchema'
import { CACHE_1D } from 'lib/fetchAPI'
import { convertMicrosToAmount } from 'utils/amount'

// 外部APIから為替レートを取得する関数
async function fetchExchangeRates() {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/JPY`,
    { next: { revalidate: CACHE_1D } }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }

  return (await res.json()).conversion_rates
}

// 金額を日本円に変換する関数
function convertToJPY(
  amount: BigNumber,
  currency: string,
  rates: Record<string, number>
): BigNumber {
  if (currency === 'JPY') {
    return amount
  }
  const rate = rates[currency]
  if (!rate) {
    throw new Error(`Unsupported currency: ${currency}`)
  }
  return amount.div(rate)
}

// 集計関数
export async function calculateTotalInJPY(chats: SuperChatsSchema) {
  const rates = await fetchExchangeRates()
  let totalInJPY = new BigNumber(0)

  for (const chat of chats) {
    const amountInBaseCurrency = convertMicrosToAmount(chat.amountMicros)
    const amountInJPY = convertToJPY(amountInBaseCurrency, chat.currency, rates)
    totalInJPY = totalInJPY.plus(amountInJPY)
  }

  return totalInJPY
}
