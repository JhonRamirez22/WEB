import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe"

function getBaseUrl(req: Request): string {
  // Use NEXT_PUBLIC_APP_URL if available, otherwise construct from request
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }
  const host = req.headers.get("host") || "localhost:3000"
  const protocol = host.includes("localhost") ? "http" : "https"
  return `${protocol}://${host}`
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const { shippingAddress, billingAddress, couponCode, isGift, giftMessage } =
      await req.json()

    // Obtener carrito
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            variant: true,
          },
        },
      },
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: "Carrito vacío" },
        { status: 400 }
      )
    }

    // Validar stock
    for (const item of cart.items) {
      if (item.variant.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${item.variant.sku}` },
          { status: 400 }
        )
      }
    }

    // Calcular totales
    let subtotal = 0
    for (const item of cart.items) {
      subtotal += Number(item.variant.price) * item.quantity
    }

    let discountAmount = 0
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode, isActive: true },
      })
      if (coupon && coupon.endsAt > new Date()) {
        if (coupon.type === "PORCENTAJE") {
          discountAmount = subtotal * (Number(coupon.value) / 100)
        } else {
          discountAmount = Number(coupon.value)
        }
      }
    }

    const shippingCost = subtotal > 3000 ? 0 : 150
    const taxAmount = (subtotal - discountAmount) * 0.16
    const total = subtotal - discountAmount + shippingCost + taxAmount

    // Crear orden en la base de datos
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: "PENDIENTE",
        subtotal,
        taxAmount,
        shippingCost,
        discountAmount,
        total,
        shippingAddress,
        billingAddress,
        isGift: isGift || false,
        giftMessage,
        paymentMethod: isStripeConfigured ? "stripe" : "manual",
        items: {
          create: cart.items.map((item) => ({
            perfumeId: item.perfumeId,
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.variant.price,
            total: Number(item.variant.price) * item.quantity,
          })),
        },
      },
    })

    // Si Stripe no está configurado, devolver orden sin checkout URL
    if (!isStripeConfigured) {
      return NextResponse.json({
        orderId: order.id,
        checkoutUrl: null,
        message: "Stripe no está configurado. Orden creada como pendiente de pago manual.",
      })
    }

    const baseUrl = getBaseUrl(req)

    // Crear sesión de Stripe
    const stripeSession = await createCheckoutSession(
      cart.items.map((item) => ({
        price_data: {
          currency: "mxn",
          product_data: {
            name: `${item.variant.perfumeId} - ${item.variant.sizeMl}ml`,
          },
          unit_amount: Math.round(Number(item.variant.price) * 100),
        },
        quantity: item.quantity,
      })),
      `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      `${baseUrl}/carrito`,
      { orderId: order.id }
    )

    if (!stripeSession) {
      return NextResponse.json({
        orderId: order.id,
        checkoutUrl: null,
        message: "Stripe no está configurado. Orden creada como pendiente de pago manual.",
      })
    }

    // Actualizar orden con payment intent
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: stripeSession.id },
    })

    return NextResponse.json({
      orderId: order.id,
      checkoutUrl: stripeSession.url,
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "Error en el checkout" },
      { status: 500 }
    )
  }
}
