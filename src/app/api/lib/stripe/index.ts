import stripe, { Stripe as StripeLib } from "stripe";

export default class Stripe {
  private static stripe = new StripeLib(String(process.env.STRIPE_SECRET_KEY));

  static async createCheckoutSession(id: string) {
    const session = await this.stripe.checkout.sessions.create({
      success_url: "http://localhost:8000/api/v1/subscription/webhook",
      cancel_url: "http://localhost:8000/api/v1/subscription/webhook",
      client_reference_id: id,
      payment_method_types: ["card", "boleto"],

      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Plano com respostas ilimitadas",
            },
            unit_amount: 1990,
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
    });

    return session;
  }
}
