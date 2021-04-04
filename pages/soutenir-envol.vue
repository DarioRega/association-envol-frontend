<template>
  <section>
    <container>
      Hello envol donation
      <button class="btn button-primary" @click="isModalOpen = true">
        Toggle donation
      </button>
    </container>
    <container>
      <modal
        v-show="isModalOpen"
        :is-modal-open="isModalOpen"
        :fluid="true"
        @closeModal="isModalOpen = false"
      >
        <modal-content-donation
          :amounts="amounts"
          :intervals="intervals"
          :custom-amount="customAmount"
          :selected-amount="selectedAmount"
          :selected-interval="selectedInterval"
          @handleSubmit="handleSubmit"
          @onSelectInterval="selectedInterval = $event"
          @onCustomAmount="customAmount = $event"
          @onSelectAmount="selectedAmount = $event"
        />
      </modal>
    </container>
  </section>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import ModalContentDonation from '@/components/donation/ModalContentDonation';
import Container from '@/components/containers/Container';
import Modal from '@/components/Modal';
const BACK_URL = process.env.BACK_URL;
const stripePromise = loadStripe(process.env.STRIPE_KEY);

// TODO make fields of form disabled when payment processing (this.paymentProcessing) is active
export default {
  name: 'SoutenirEnvol',
  components: { Modal, Container, ModalContentDonation },
  layout: 'helpEnvol',
  data() {
    return {
      stripe: undefined,
      isModalOpen: false,
      customAmount: null,
      targetProcess: 'subscription',
      amounts: [],
      intervals: [],
      metadata: [],
      selectedAmount: {},
      selectedInterval: {},
    };
  },
  async mounted() {
    this.stripe = await stripePromise;

    this.$axios.get(`${BACK_URL}/products/metadata`).then((res) => {
      console.log('res.data', res.data);
      const { amounts, intervals } = res.data;
      this.amounts = amounts;
      this.intervals = intervals;
      this.selectedInterval = intervals[1];
      this.selectedAmount = amounts[0];
    });
  },
  updated() {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      this.donationState = 'success';
    }
    if (query.get('canceled')) {
      this.donationState = 'canceled';
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  },
  methods: {
    async handleSubmit() {
      // check if custom amount
      // let price;
      // if (!this.selectedAmount.id) {
      const { data } = await this.$axios.post(
        `${BACK_URL}/products/prices/findOrCreate`,
        {
          selected_amount: {
            id: this.selectedAmount.id,
            amount: this.selectedAmount.id
              ? this.selectedAmount.amount
              : this.selectedAmount.amount * 100,
          },
          selected_interval: this.selectedInterval,
        }
      );
      this.processPayment(data);
    },
    async processPayment(price) {
      console.log('price process', price);
      const stripe = await stripePromise;
      const { data } = await this.$axios.post(
        `${process.env.BACK_URL}/donate/session`,
        {
          price,
        }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      if (result.error) {
        console.log('error', result.error.message);
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    },
  },
};
</script>
