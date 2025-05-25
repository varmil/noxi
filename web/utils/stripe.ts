import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

/** Use NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  */
export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!key) throw new Error('Stripe公開キーが設定されていません')
    stripePromise = loadStripe(key)
  }
  return stripePromise
}
