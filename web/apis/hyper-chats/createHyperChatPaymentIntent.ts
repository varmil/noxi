'use server'

import {
  paymentIntentResponseSchema,
  PaymentIntentResponseSchema,
  TierValue
} from 'apis/hyper-chats/hyperChatSchema'
import { fetchAPI } from 'lib/fetchAPI'
import { checkModeration } from 'utils/input/moderation'

type Data = {
  channelId: string
  group: string
  gender: 'male' | 'female' | 'nonbinary'
  tier: TierValue
  message: string
}

export async function createHyperChatPaymentIntent(
  data: Data
): Promise<PaymentIntentResponseSchema> {
  // OpenAI Moderation check (server-side)
  if (data.message) {
    const isClean = await checkModeration(data.message)
    if (!isClean) {
      throw new Error('moderation: Message contains inappropriate content')
    }
  }

  const res = await fetchAPI(`/api/hyper-chats/payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    cache: 'no-store'
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to create payment intent: ${errorText}`)
  }

  return paymentIntentResponseSchema.parse(await res.json())
}
