'use server';

import { connectToDatabase } from '@/lib/database';
import Order from '@/lib/database/models/order.model';
import { handleError } from '@/lib/utils';
import { CheckoutOrderParams, CreateOrderParams } from '@/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export async function checkoutOrder(order: CheckoutOrderParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = order.isFree ? 0 : Number(order.price) * 100
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/?canceled=true`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
    //handleError(error)
  }
}

export async function createOrder(order: CreateOrderParams) {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId
    });
    revalidatePath('/profile');

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}