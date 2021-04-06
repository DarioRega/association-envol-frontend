<template>
  <section>
    <container>
      <div class="text-center lg:flex lg:flex-row-reverse lg:items-center">
        <flying-birds
          class="md:w-full md:max-w-4xl mx-auto lg:w-7/12 lg:pl-8 2xl:pl-6 2xl:w-7/12"
        />
        <div class="lg:w-5/12 2xl:w-5/12 lg:text-right h-full">
          <nuxt-content :document="intro" class="font-medium h-full" />
        </div>
      </div>
      <div class="text-center lg:text-left pt-4 lg:pt-0 3xl:-mt-16">
        <h5 class="lg:mb-6 hidden lg:block">
          {{ $t('helpEnvol.butWeStillNeedYou') }}
        </h5>
        <button
          class="btn button-primary font-semibold lg:mt-6 focus:outline-none"
          @click="isModalOpen = true"
        >
          {{ $t('helpEnvol.donateNow') }}
        </button>
      </div>
    </container>
    <container>
      <nuxt-content :document="informations" class="font-medium" />
    </container>
    <container v-show="isModalOpen">
      <modal
        :is-modal-open="isModalOpen"
        :fluid="true"
        @closeModal="isModalOpen = false"
      >
        <modal-content-donation
          :amounts="amounts"
          :intervals="intervals"
          :selected-payment-method="selectedPaymentMethod"
          :custom-amount="customAmount"
          :selected-amount="selectedAmount"
          :selected-interval="selectedInterval"
          @handleSubmit="handleSubmit"
          @onSelectInterval="selectedInterval = $event"
          @onSelectPaymentMethod="selectedPaymentMethod = $event"
          @onCustomAmount="customAmount = $event"
          @onSelectAmount="selectedAmount = $event"
        />
      </modal>
    </container>
  </section>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import { v4 as uuidv4 } from 'uuid';
import ModalContentDonation from '@/components/donation/ModalContentDonation';
import Container from '@/components/containers/Container';
import Modal from '@/components/Modal';
import FlyingBirds from '@/components/FlyingBirds';

const BACK_URL = process.env.BACK_URL;
const stripePromise = loadStripe(process.env.STRIPE_KEY);

// TODO make fields of form disabled when payment processing (this.paymentProcessing) is active
export default {
  name: 'SoutenirEnvol',
  components: { FlyingBirds, Modal, Container, ModalContentDonation },
  layout: 'helpEnvol',
  async asyncData({ $getContent, error }) {
    try {
      const intro = await $getContent('donate/intro');
      const informations = await $getContent('donate/informations');
      return { intro, informations };
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      });
    }
  },
  data() {
    return {
      intro: {},
      informations: {},
      stripe: undefined,
      isModalOpen: false,
      customAmount: null,
      amounts: [],
      intervals: [],
      metadata: [],
      selectedPaymentMethod: 'stripe',
      selectedAmount: {},
      selectedInterval: {},
      donationState: '',
      sessionId: '',
    };
  },
  watch: {
    data(newValue, oldValue) {},
  },
  async mounted() {
    this.verifyIfDonationRedirect();

    this.stripe = await stripePromise;

    this.$axios.get(`${BACK_URL}/products/metadata`).then((res) => {
      const { amounts, intervals } = res.data;
      this.amounts = amounts;
      this.intervals = intervals;
      this.selectedInterval = intervals[1];
      this.selectedAmount = amounts[0];
    });
  },
  // updated() {
  //   const query = new URLSearchParams(window.location.search);
  //   if (query.get('success') && query.get('session') === this.sessionId) {
  //     this.donationState = 'success';
  //   }
  //   if (query.get('canceled') && query.get('session') === this.sessionId) {
  //     this.donationState = 'canceled';
  //   }
  // },
  methods: {
    verifyIfDonationRedirect() {
      let donation = sessionStorage.getItem('donation');
      if (donation) {
        donation = JSON.parse(donation);
        this.sessionId = donation.sessionId;
        if (!donation.isThankYouEmailSent) {
          console.log('WILL SEND EMAIL');
          const query = new URLSearchParams(window.location.search);
          if (
            query.get('success') &&
            query.get('session') === donation.sessionId
          ) {
            this.donationState = 'success';
            this.$axios
              .post(`${BACK_URL}/donate/thankYou`, donation)
              .then((res) => console.log('response', res));

            donation.isThankYouEmailSent = true;

            sessionStorage.setItem('donation', JSON.stringify(donation));
            this.autoDestructDonationSessionStorage();
          }
          if (
            query.get('canceled') &&
            query.get('session') === donation.sessionId
          ) {
            this.donationState = 'canceled';
          }
        }
      }
    },
    autoDestructDonationSessionStorage() {
      console.log('timer');
      setTimeout(() => {
        sessionStorage.removeItem('donation');
      }, 300000);
    },
    async handleSubmit(customer) {
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
      this.processPayment(data, customer);
    },
    async processPayment(price, customer) {
      const sessionId = uuidv4();
      const donation = {
        sessionId,
        amount: this.selectedAmount.amount,
        interval: this.selectedInterval.name,
        isThankYouEmailSent: false,
        created_at: new Date(),
        ...customer,
      };

      sessionStorage.setItem('donation', JSON.stringify(donation));

      const stripe = await stripePromise;
      const { data } = await this.$axios.post(
        `${process.env.BACK_URL}/donate/session`,
        {
          price,
          sessionId,
        }
      );
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      if (result.error) {
        console.log('error', result.error.message);
        this.donationState = 'error';
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    },
  },
};
</script>
