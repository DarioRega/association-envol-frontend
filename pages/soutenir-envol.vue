<template>
  <section>
    <container>
      <modal-content-donation
        :amounts="amounts"
        :intervals="intervals"
        @processToPayment="processToPaymentGateway"
      />
      <button @click="processPayment">process</button>
    </container>
  </section>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import ModalContentDonation from '@/components/donation/ModalContentDonation';
import Container from '@/components/containers/Container';
const BACK_URL = process.env.BACK_URL;
const stripePromise = loadStripe(process.env.STRIPE_KEY);

// TODO make fields of form disabled when payment processing (this.paymentProcessing) is active
export default {
  name: 'SoutenirEnvol',
  components: { Container, ModalContentDonation },
  layout: 'helpEnvol',
  data() {
    return {
      stripe: undefined,
      selectedProductId: null,
      amountSelected: 50,
      customAmount: 0,
      targetProcess: 'subscription',
      amounts: [],
      intervals: [],
      metadata: [],
      mainProducts: {},
    };
  },
  mounted() {
    this.$axios.get(`${BACK_URL}/products/metadata`).then((res) => {
      console.log('res.data', res.data);
      const { amounts, intervals } = res.data;
      this.amounts = amounts;
      this.intervals = intervals;
    });
    this.$axios.get(`${BACK_URL}/products`).then((res) => {
      // eslint-disable-next-line camelcase
      const { one_time, month, year } = res.data;
      this.mainProducts = { one_time, month, year };
    });
  },
  updated() {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }
    if (query.get('canceled')) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  },
  methods: {
    processToPaymentGateway({ selectedAmount, selectedInterval, details }) {},
    async processPayment() {
      const stripe = await stripePromise;
      const { data } = await this.$axios.post(
        `${process.env.BACK_URL}/donate/session?sessionTarget=${this.targetProcess}`
      );

      // const session = await response.json();
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      if (result.error) {
        console.log('error');
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    },
  },
};
</script>
