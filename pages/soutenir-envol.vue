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
          @click="handlePaypalSubmit"
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
import { loadStripe } from '@stripe/stripe-js';
import { loadScript } from '@paypal/paypal-js';
import { v4 as uuidv4 } from 'uuid';
import ModalContentDonation from '@/components/donation/ModalContentDonation';
import Container from '@/components/containers/Container';
import Modal from '@/components/Modal';
import FlyingBirds from '@/components/FlyingBirds';
import ModalContentDonationSuccess from '@/components/donation/ModalContentDonationSuccess';

const BACK_URL = process.env.BACK_URL;
const stripePromise = loadStripe(process.env.STRIPE_KEY);
const MAIN_DONATIONS_AMOUNTS = [20, 50, 100];
const paypalPromise = (params = {}) =>
  loadScript({
    'client-id': process.env.PAYPAL_KEY,
    currency: 'CHF',
    ...params,
  });

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
    // this.verifyIfDonationRedirect();
    // this.stripe = await stripePromise;

    this.$axios.get(`${BACK_URL}/products/metadata`).then((res) => {
      const { amounts, intervals } = res.data;
      this.amounts = amounts;
      this.intervals = intervals;
      this.selectedInterval = intervals[1];
      this.selectedAmount = amounts[0];
    });
  },
  methods: {
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
              .post(`${BACK_URL}/donate/thankYou`, donation)
              .then((res) => {
                donation.isThankYouEmailSent = true;
                sessionStorage.setItem('donation', JSON.stringify(donation));
                this.autoDestructDonationSessionStorage();
                this.refreshModalDonation();
              });
          } else {
            this.donationState = '';
          }
        }
      } else {
        this.donationState = '';
      }

      if (query.get('canceled')) {
        sessionStorage.removeItem('donation');
        this.$router.push('/soutenir-envol');
        this.isModalOpen = false;
        this.donationState = '';
      }
    },
    autoDestructDonationSessionStorage() {
      setTimeout(() => {
        sessionStorage.removeItem('donation');
      }, 300000);
    },
    refreshModalDonation() {
      setTimeout(() => {
        this.isModalOpen = false;
        this.donationState = '';
      }, 5000);
    },
    handleSubmit(customer) {
      this.sessionId = uuidv4();

      if (this.selectedPaymentMethod === 'stripe') {
        this.handleStripeSubmit(customer);
      } else {
        this.handlePaypalSubmit(customer);
      }
    },
    setDonationInSessionStorage(donation) {
      sessionStorage.setItem('donation', JSON.stringify(donation));
    },
    async handlePaypalSubmit(customer) {
      let paypal;
      let config = {};
      if (this.selectedInterval.ref === 'one_time') {
        const selectedAmount = this.selectedAmount.amount / 100;
        paypal = await paypalPromise();
        config = {
          createOrder(data, actions) {
            // This function sets up the details of the transaction, including the amount and line item details.
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: selectedAmount,
                  },
                },
              ],
            });
          },
          onApprove(data, actions) {
            // This function captures the funds from the transaction.
            return actions.order.capture().then(function (details) {
              // This function shows a transaction success message to your buyer.
              alert(
                `Transaction completed by ${details.payer.name.given_name}`
              );
            });
          },
        };
      } else {
        const plan = await this.getPaypalSubscription();
        paypal = await paypalPromise({
          vault: true,
          intent: 'subscription',
        });

        config = {
          createSubscription(data, actions) {
            return actions.subscription.create({
              plan_id: plan.id,
            });
          },
          onApprove(data, actions) {
            alert(
              `You have successfully created subscription ${data.subscriptionID}`
            );
          },
        };
      }
      paypal.Buttons(config).render('#paypal-button');
    },
    async handleStripeSubmit(customer) {
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
      this.processStripePayment(data, customer);
    },
    async processStripePayment(price, customer) {
      const donation = {
        sessionId: this.sessionId,
        amount: this.selectedAmount.amount,
        interval: this.selectedInterval.name,
        isThankYouEmailSent: false,
        created_at: new Date(),
        ...customer,
      };

      this.setDonationInSessionStorage(donation);

      const stripe = await stripePromise;
      const { data } = await this.$axios.post(
        `${process.env.BACK_URL}/donate/session`,
        {
          price,
          client_session: this.sessionId,
          email: customer.email,
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
    getPaypalSubscription() {
      // TODO Find if create subscription front end send or backend side
      // use https://www.sandbox.paypal.com/billing/plans to find billings plans
      return new Promise((resolve, reject) => {
        const auth = {
          username: process.env.PAYPAL_KEY,
          password: process.env.PAYPAL_SECRET,
        };
        this.$axios
          .get('https://api-m.sandbox.paypal.com/v1/billing/plans', {
            auth,
          })
          .then((res) => {
            resolve(this.findOrCreatePaypalPlan(res.data.plans));
          })
          .catch((err) => reject(err));
      });
    },
    findOrCreatePaypalPlan(data) {
      if (!MAIN_DONATIONS_AMOUNTS.includes(this.selectedAmount.amount / 100)) {
        console.log('IS CUSTOM AMOUNT', this.selectedAmount.amount / 100);
        // const plan = data.filter((plan) => plan.name === ``);
      } else {
        // console.log('SELECTED AMOUNT / 100', this.selectedAmount.amount / 100);
        // console.log('SELECTED INTERVAL', this.selectedInterval.ref);
        // console.log('PLANS => ', data);
        const targetPlan = data.filter(
          (plan) =>
            plan.name ===
            `main-${this.selectedAmount.amount / 100}-${
              this.selectedInterval.ref
            }`
        );
        if (targetPlan.length > 0) {
          return targetPlan[0];
        }
      }
    },
  },
};
</script>
