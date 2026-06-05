import Stripe from "stripe"

const secretKey = process.env.STRIPE_SECRET_KEY

export const stripe = secretKey
  ? new Stripe(secretKey, { typescript: true })
  : null

export const isStripeConfigured = !!stripe

export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
}: {
  priceId: string
  domainUrl: string
  customerId: string
}) => {
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
