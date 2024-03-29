<template>
  <section class="max-w-screen overflow-hidden">
    <container>
      <div class="text-center lg:flex lg:flex-row-reverse lg:items-center">
        <flying-birds
          data-aos="fade-left"
          data-aos-duration="900"
          data-custom-fade="birds-face"
          data-aos-delay="200"
          class="md:w-full md:max-w-4xl mx-auto lg:w-7/12 lg:pl-8 2xl:pl-6 2xl:w-7/12"
        />
        <div
          class="lg:w-5/12 2xl:w-5/12 lg:text-right h-full"
          data-aos="fade-right"
          data-aos-duration="900"
          data-custom-fade="help-envol"
          data-aos-delay="200"
        >
          <nuxt-content :document="intro" class="font-medium h-full" />
        </div>
      </div>
      <div
        class="text-center lg:text-left pt-4 lg:pt-0 3xl:-mt-16"
        data-aos="fade-up"
        data-aos-duration="900"
        data-aos-delay="600"
      >
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
    <container data-aos="fade-up" data-aos-duration="900" data-aos-delay="900">
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
          :selected-amount="selectedAmount"
          :selected-interval="selectedInterval"
          :is-custom-amount="isCustomAmount"
          @handleSubmit="handleSubmit"
          @closeModal="isModalOpen = false"
          @onSelectInterval="selectedInterval = $event"
          @onSelectPaymentMethod="selectedPaymentMethod = $event"
          @onCustomAmountEntry="isCustomAmount = $event"
          @onSelectAmount="selectedAmount = $event"
        >
          <div v-if="isPaypalLoading" class="text-center">
            <p>
              <i>{{ $t('helpEnvol.loadingPaypal') }}</i>
            </p>
          </div>
          <div id="paypal-button"></div>
        </modal-content-donation>
      </modal>
    </container>
    <notification
      v-if="shouldShowNotification"
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
import { API_URL } from '@/constantes';

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
      isCustomAmount: false,
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
  mounted() {
    this.verifyIfDonationRedirect();
    this.getMainAmountsAndIntervals();
  },
  methods: {
    getMainAmountsAndIntervals() {
      this.$axios.get(API_URL.PRODUCTS_METADATA).then((res) => {
        const { amounts, intervals } = res.data;
        this.amounts = amounts;
        this.intervals = intervals;
        this.selectedInterval = intervals[1];
        this.selectedAmount = amounts[0];
      });
    },
    verifyRefreshsAttempts() {
      let refreshRetries = parseInt(
        sessionStorage.getItem('refresh_retries') || '0'
      );
      refreshRetries = refreshRetries + 1;
      sessionStorage.setItem('refresh_retries', refreshRetries.toString());
      return refreshRetries;
    },

    async verifyIfDonationRedirect() {
      const query = new URLSearchParams(window.location.search);

      let donation = sessionStorage.getItem('donation');
      if (donation) {
        const refreshRetries = this.verifyRefreshsAttempts();
        donation = JSON.parse(donation);
        this.sessionId = donation.sessionId;
        if (refreshRetries > 2) {
          sessionStorage.removeItem('donation');
          sessionStorage.removeItem('refresh_retries');
          return this.pushAndResetDonationState();
        }
        if (!donation.isThankYouEmailSent) {
          if (
            query.get('success') &&
            query.get('session') === donation.sessionId
          ) {
            this.donationState = 'success';
            this.isModalOpen = true;
            try {
              await this.$axios.post(API_URL.THANK_YOU_URL, donation);
              donation.isThankYouEmailSent = true;
              sessionStorage.setItem('donation', JSON.stringify(donation));
              sessionStorage.setItem('refresh_retries', '0');
              autoDestructDonationSessionStorage();
            } catch (err) {
              this.notification = {
                ...this.notification,
                type: 'error',
                message: err.response.data.message,
              };
              // TODO show warning but donation ok
            }
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
      this.notification = {
        type: 'error',
        message: `<div class="font-medium">${this.$t(
          'helpEnvol.errorPaypalMessage'
        )}</div>`,
      };
      this.shouldShowNotification = true;
      setTimeout(() => {
        this.notification = {
          type: '',
          message: '',
        };
        this.shouldShowNotification = false;
      }, 6000);
    },
  },
  head() {
    return { title: `Soutenir - ${process.env.APP_NAME}` };
  },
  layout: 'helpEnvol',
};
</script>
<style lang="scss" scoped>
[data-custom-fade='birds-face'] {
  transform: translate3d(500px, 0, 0);
}
[data-custom-fade='help-envol'] {
  transform: translate3d(-500px, 0, 0);
}
</style>
