'use server'

import { headers } from 'next/headers'

import { auth } from 'lib/auth'
import { stripe } from 'lib/stripe'

export async function fetchClientSecret() {
  const origin = (await headers()).get('origin') || 'http://localhost:3000'
  const authSession = await auth()

  if (!authSession?.user) {
    throw new Error('User not authenticated')
  }

  // Stripe Customer を作成（すでにあれば再利用）
  // let customerId = await getOrCreateStripeCustomer(user.id)

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    // TODO:
    // customer: customerId
    customer_email: authSession.user.email ?? undefined,
    line_items: [
      {
        price: 'price_1RLHc904jYHRbdyomhjz46MR',
        quantity: 1
      }
    ],
    mode: 'subscription',
    return_url: `${origin}/monthly-pass/success?sessionId={CHECKOUT_SESSION_ID}`,
    ui_mode: 'embedded'
  })

  if (!session.client_secret) {
    throw new Error('Failed to create session.client_secret')
  }

  return session.client_secret
}
