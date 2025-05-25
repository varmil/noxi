'use server'

import { headers } from 'next/headers'

import { stripe } from 'lib/stripe'

export async function fetchClientSecret() {
  const origin = (await headers()).get('origin') || 'http://localhost:3000'

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    customer_email: 'fkmks247@gmail.com', // TODO: use from parameter
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
