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
        <button
          class="btn font-semibold lg:mt-6 focus:outline-none"
          @click="handleSubmit"
        >
          go paypal
        </button>
        <div id="paypal-button"></div>
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
        <modal-content-donation-success
          v-if="donationState === 'success'"
          @closeModal="isModalOpen = false"
        />
        <modal-content-donation
          v-else
          :amounts="amounts"
          :intervals="intervals"
          :selected-payment-method="selectedPaymentMethod"
          :custom-amount="customAmount"
          :selected-amount="selectedAmount"
          :selected-interval="selectedInterval"
          @handleSubmit="handleSubmit"
          @closeModal="isModalOpen = false"
          @onSelectInterval="selectedInterval = $event"
          @onSelectPaymentMethod="selectedPaymentMethod = $event"
          @onCustomAmount="customAmount = $event"
          @onSelectAmount="selectedAmount = $event"
        >
          <!--          <div id="paypal-button"></div>-->
          test
        </modal-content-donation>
      </modal>
    </container>
  </section>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import ModalContentDonation from '@/components/donation/ModalContentDonation';
import Container from '@/components/containers/Container';
import Modal from '@/components/Modal';
import FlyingBirds from '@/components/FlyingBirds';
import ModalContentDonationSuccess from '@/components/donation/ModalContentDonationSuccess';
import {
  configureOneTimePaymentPaypal,
  configureSubscriptionsPaypal,
} from '@/config/paypal';
import { handleStripeSubmit } from '@/config/stripe';
import { autoDestructDonationSessionStorage } from '@/config';

// TODO
// Gérer paypal si on fait un retour dans le formulaire ou reclique, pas afficher d erreur, mais re-render le button
// reformat stripe in config file
// reformat code and clean here.
// handle ui select when set custom amount then click on main amount then reclick on custom amount doenst make blue background
const BACK_URL = process.env.BACK_URL;
const MAIN_DONATIONS_AMOUNTS = [20, 50, 100];

// TODO make fields of form disabled when payment processing (this.paymentProcessing) is active
export default {
  name: 'SoutenirEnvol',
  components: {
    ModalContentDonationSuccess,
    FlyingBirds,
    Modal,
    Container,
    ModalContentDonation,
  },
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
  mounted() {
    this.verifyIfDonationRedirect();
    this.getMainAmountsAndIntervals();
  },
  methods: {
    getMainAmountsAndIntervals() {
      this.$axios.get(`${BACK_URL}/products/metadata`).then((res) => {
        const { amounts, intervals } = res.data;
        this.amounts = amounts;
        this.intervals = intervals;
        this.selectedInterval = intervals[1];
        this.selectedAmount = amounts[0];
      });
    },
    verifyIfDonationRedirect() {
      const query = new URLSearchParams(window.location.search);
      let donation = sessionStorage.getItem('donation');
      if (donation) {
        donation = JSON.parse(donation);
        this.sessionId = donation.sessionId;
        if (!donation.isThankYouEmailSent) {
          if (
            query.get('success') &&
            query.get('session') === donation.sessionId
          ) {
            this.donationState = 'success';
            this.isModalOpen = true;

            this.$axios
              .post(`${process.env.BACK_URL}/donate/thankYou`, donation)
              .then((res) => {
                donation.isThankYouEmailSent = true;
                sessionStorage.setItem('donation', JSON.stringify(donation));
                autoDestructDonationSessionStorage();

                this.refreshModalDonation();
              });
          } else {
            this.donationState = '';
          }
        } else {
          this.$router.push('/soutenir-envol');
          this.donationState = '';
          sessionStorage.removeItem('donation');
        }
      } else {
        this.$router.push('/soutenir-envol');
        this.donationState = '';
      }

      if (query.get('canceled')) {
        sessionStorage.removeItem('donation');
        this.$router.push('/soutenir-envol');
        this.isModalOpen = false;
        this.donationState = '';
      }
    },
    refreshModalDonation() {
      setTimeout(() => {
        this.isModalOpen = false;
        this.donationState = '';
      }, 5000);
    },
    handleSubmit(customer) {
      const sessionId = uuidv4();
      this.sessionId = sessionId;

      const payloadDonation = {
        sessionId,
        selectedAmount: this.selectedAmount,
        selectedInterval: this.selectedInterval,
        ...customer,
      };

      if (this.selectedPaymentMethod === 'stripe') {
        handleStripeSubmit({
          $axios: this.$axios,
          payload: payloadDonation,
        });
      } else {
        this.handlePaypalSubmit({ payload: payloadDonation });
      }
    },
    async handlePaypalSubmit({ payload }) {
      let setup;
      if (this.selectedInterval.ref === 'one_time') {
        setup = await configureOneTimePaymentPaypal({
          payload,
          successCallback: this.paypalSuccessCallback,
          errorCallback: () => console.log('error callback'),
        });
      } else {
        setup = await configureSubscriptionsPaypal({
          $axios: this.$axios,
          MAIN_DONATIONS_AMOUNTS,
          payload,
          successCallback: this.paypalSuccessCallback,
          errorCallback: () => console.log('error callback'),
        });
      }
      setup.paypal.Buttons(setup.config).render('#paypal-button');
    },
    paypalSuccessCallback() {
      this.$router.push(
        {
          path: `/soutenir-envol?session=${this.sessionId}&success=true&paymentMethod=paypal`,
        },
        () => this.verifyIfDonationRedirect()
      );
    },
    // async handleStripeSubmit(customer) {
    //   const { data } = await this.$axios.post(
    //     `${BACK_URL}/products/prices/findOrCreate`,
    //     {
    //       selected_amount: {
    //         id: this.selectedAmount.id,
    //         amount: this.selectedAmount.id
    //           ? this.selectedAmount.amount
    //           : this.selectedAmount.amount * 100,
    //       },
    //       selected_interval: this.selectedInterval,
    //     }
    //   );
    //   this.processStripePayment(data, customer);
    // },
    // async processStripePayment(price, customer) {
    //   const donation = {
    //     sessionId: this.sessionId,
    //     amount: this.selectedAmount.amount,
    //     interval: this.selectedInterval.name,
    //     isThankYouEmailSent: false,
    //     created_at: new Date(),
    //     ...customer,
    //   };
    //
    //   this.setDonationInSessionStorage(donation);
    //
    //   const stripe = await stripePromise;
    //   const { data } = await this.$axios.post(
    //     `${process.env.BACK_URL}/donate/session`,
    //     {
    //       price,
    //       client_session: this.sessionId,
    //       email: customer.email,
    //     }
    //   );
    //   const result = await stripe.redirectToCheckout({
    //     sessionId: data.id,
    //   });
    //   if (result.error) {
    //     console.log('error', result.error.message);
    //     this.donationState = 'error';
    //     // If `redirectToCheckout` fails due to a browser or network
    //     // error, display the localized error message to your customer
    //     // using `result.error.message`.
    //   }
    // },
  },
};
</script>
