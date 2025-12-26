import { type NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover'
})

/** @deprecated Stripeへ移動させたい場合はこれを使う */
export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      //   payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1RLHc904jYHRbdyomhjz46MR',
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${origin}/monthly-pass/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/monthly-pass`
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout session creation error:', error)
    return NextResponse.json(
      { error: 'チェックアウトセッションの作成に失敗しました' },
      { status: 500 }
    )
  }
}
