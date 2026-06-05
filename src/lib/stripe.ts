import type Stripe from "stripe"

let _stripe: Stripe | null = null

async function getStripeClient(): Promise<Stripe | null> {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) return null

  if (!_stripe) {
    const { default: Stripe } = await import("stripe")
    _stripe = new Stripe(secretKey, { typescript: true }) as unknown as Stripe
  }
  return _stripe
}

export async function getStripeSession({
  priceId,
  domainUrl,
  customerId,
}: {
  priceId: string
  domainUrl: string
  customerId: string
}) {
  const stripe = await getStripeClient()
  if (!stripe) {
    throw new Error("Stripe no está configurado")
  }
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "payment",
    billing_address_collection: "auto",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${domainUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainUrl}/checkout/cancel`,
  })
  return session
}

export async function createCheckoutSession(lineItems: any[], successUrl: string, cancelUrl: string, metadata: Record<string, string>) {
  const stripe = await getStripeClient()
  if (!stripe) return null

  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  })
}

export const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY
