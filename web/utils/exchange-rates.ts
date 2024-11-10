import 'server-only'
import { SuperChatsSchema } from 'apis/youtube/schema/superChatSchema'

const API_KEY = 'a26bced4547fbb900dbebcac'

// 外部APIから為替レートを取得する関数
async function fetchExchangeRates() {
  console.time('fetchExchangeRates')
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/JPY`,
    { next: { revalidate: 24 * 3600 } }
  )
  console.timeEnd('fetchExchangeRates')

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }

  return (await res.json()).conversion_rates
}

// 金額を日本円に変換する関数
function convertToJPY(
  amount: number,
  currency: string,
  rates: Record<string, number>
): number {
  if (currency === 'JPY') {
    return amount
  }
  const rate = rates[currency]
  if (!rate) {
    throw new Error(`Unsupported currency: ${currency}`)
  }
  return amount * rate
}

// 集計関数
export async function calculateTotalInJPY(chats: SuperChatsSchema) {
  const rates = await fetchExchangeRates()
  let totalInJPY = 0

  for (const chat of chats) {
    const amountInBaseCurrency = chat.amountMicros / 1_000_000 // amountMicrosを正規化
    const amountInJPY = convertToJPY(amountInBaseCurrency, chat.currency, rates)
    totalInJPY += amountInJPY
  }

  return totalInJPY
}
