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
          <div v-if="isPaypalLoading" class="text-center">
            <p>{{ $t('helpEnvol.loadingPaypal') }}</p>
          </div>
          <div id="paypal-button"></div>
        </modal-content-donation>
      </modal>
    </container>
    <notification
      :is-visible="shouldShowNotification"
      :type="notification.type"
      :message="notification.message"
      @click="shouldShowNotification = false"
    />
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
import Notification from '@/components/Notification';

// TODO
// ERROR notification not showing up the error icon
// handle ui select when set custom amount then click on main amount then reclick on custom amount doenst make blue background
const BACK_URL = process.env.BACK_URL;
const MAIN_DONATIONS_AMOUNTS = [20, 50, 100];
const PAYPAL_BTN_STYLES = {
  layout: 'horizontal',
  color: 'gold',
  shape: 'rect',
  label: 'paypal',
  tagline: false,
};
export default {
  name: 'SoutenirEnvol',
  components: {
    Notification,
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
      isPaypalLoading: false,
      shouldShowNotification: false,
      notification: {
        type: '',
        message: '',
      },
    };
  },
  watch: {
    data(newValue, oldValue) {},
  },
  mounted() {
    this.paypalErrorCallback();
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
              });
          } else {
            this.donationState = '';
          }
        } else {
          this.pushAndResetDonationState();
          sessionStorage.removeItem('donation');
        }
      } else {
        this.pushAndResetDonationState();
      }
      if (query.get('canceled')) {
        sessionStorage.removeItem('donation');
        this.isModalOpen = false;
        this.pushAndResetDonationState();
      }
    },
    pushAndResetDonationState() {
      this.$router.push(`/${this.$t('helpEnvol.slug')}`);
      this.donationState = '';
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
      this.isPaypalLoading = true;
      let setup;
      if (this.selectedInterval.ref === 'one_time') {
        setup = await configureOneTimePaymentPaypal({
          payload,
          successCallback: this.paypalSuccessCallback,
          errorCallback: () => this.paypalErrorCallback,
        });
      } else {
        setup = await configureSubscriptionsPaypal({
          $axios: this.$axios,
          MAIN_DONATIONS_AMOUNTS,
          payload,
          successCallback: this.paypalSuccessCallback,
          errorCallback: () => this.paypalErrorCallback,
        });
      }
      setup.paypal
        .Buttons({
          style: PAYPAL_BTN_STYLES,
          funding: {
            disallowed: [
              setup.paypal.FUNDING.CARD,
              setup.paypal.FUNDING.CREDIT,
            ],
          },
          ...setup.config,
        })
        .render('#paypal-button')
        .then((res) => (this.isPaypalLoading = false));
    },
    paypalSuccessCallback() {
      this.$router.push(
        {
          path: `/${this.$t('helpEnvol.slug')}?session=${
            this.sessionId
          }&success=true&paymentMethod=paypal`,
        },
        () => this.verifyIfDonationRedirect()
      );
    },
    paypalErrorCallback() {
      // TODO check if html is well formated with the $t
      this.shouldShowNotification = true;
      this.notification = {
        type: 'error',
        message: `<div class="font-medium">${this.$t(
          'helpEnvol.errorPaypalMessage'
        )}</div>`,
      };
      setTimeout(() => {
        this.notification = {};
        this.shouldShowNotification = false;
      }, 6000);
    },
  },
};
</script>
