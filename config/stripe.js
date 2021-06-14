import { loadStripe } from '@stripe/stripe-js';
import { setDonationInSessionStorage } from '@/config/index';

const stripePromise = loadStripe(process.env.STRIPE_KEY);
export const handleStripeSubmit = async ({ $axios, payload }) => {
  const { selectedAmount, selectedInterval } = payload;
  const { data } = await $axios.post(
    `${process.env.BACK_URL}/products/prices/findOrCreate`,
    {
      selected_amount: {
        id: selectedAmount.id,
        amount: selectedAmount.amount,
      },
      selected_interval: selectedInterval,
    }
  );

  processStripePayment({ $axios, payload, price: data });
};
/*
* payload object:
    sessionId,
    selectedAmount: Object,
    selectedInterval: Object,
    full_name
    company_name
    commentary
    email
    payment_method
 */
export const processStripePayment = async ({ $axios, payload, price }) => {
  const donation = {
    ...payload,
    isThankYouEmailSent: false,
    created_at: new Date(),
    amount: payload.selectedAmount.amount,
    interval: payload.selectedInterval.ref,
  };
  setDonationInSessionStorage(donation);
  const stripe = await stripePromise;

  const { data } = await $axios.post(`${process.env.BACK_URL}/donate/session`, {
    price,
    client_session: payload.sessionId,
    email: payload.email,
  });

  const result = await stripe.redirectToCheckout({
    sessionId: data.id,
  });

  if (result.error) {
    // TODO handle that
    console.log('error', result.error.message);
    // this.donationState = 'error';
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
  }
};
