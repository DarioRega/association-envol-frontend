<template>
  <section class="relative flex justify-center items-center">
    <container-steps class="relative" @closeModal="$emit('closeModal')">
      <template v-slot:form>
        <wrapper-steps>
          <form class="form-donation">
            <payment-method-step
              v-if="currentStep.number === 1"
              class="w-full"
              :selected-payment-method="selectedPaymentMethod"
              @onPaymentMethod="$emit('onSelectPaymentMethod', $event)"
            />

            <amount-step
              v-if="currentStep.number === 2"
              :intervals="intervals"
              :selected-interval="selectedInterval"
              :amounts="amounts"
              :selected-amount="selectedAmount"
              :is-custom-amount="isCustomAmount"
              :errors="errors.amount"
              class="w-full"
              @onAmountSelect="handleSelectAmount"
              @onIntervalSelect="handleSelectInterval"
              @onCustomAmount="handleCustomAmount"
            />

            <customer-step
              v-if="currentStep.number === 3"
              :has-commentary="hasCommentary"
              :commentary="commentary"
              :full_name="full_name"
              :is-donation-from-company="isDonationFromCompany"
              :company_name="company_name"
              :email="email"
              :errors="errors.customer"
              class="w-full"
              @onHasCommentary="hasCommentary = $event"
              @onCommentary="commentary = $event"
              @onFullName="full_name = $event"
              @onEmail="email = $event"
              @onDonationFromCompany="isDonationFromCompany = $event"
              @onCompanyName="company_name = $event"
            />

            <resume-step
              v-if="currentStep.number === 4"
              :selected-amount="selectedAmount"
              :selected-interval="selectedInterval"
              :selected-payment-method="selectedPaymentMethod"
              :has-commentary="hasCommentary"
              :commentary="commentary"
              :email="email"
              :full_name="full_name"
              :is-donation-from-company="isDonationFromCompany"
              :company_name="company_name"
              class="w-full"
            />
          </form>
        </wrapper-steps>
      </template>

      <template v-slot:stepper>
        <div
          v-if="
            selectedPaymentMethod === 'paypal' && currentStep.name === 'resume'
          "
          class="max-w-lg lg:max-w-xl mx-auto w-full"
        >
          <slot />
        </div>
        <form-stepper
          :current-step="currentStep.number"
          :total-steps="steps.length"
          class="
            mt-6
            md:mt-10
            px-5
            lg:px-0
            pb-10
            max-w-lg
            lg:max-w-xl
            mx-auto
            w-full
            flex
            space-between
          "
          @onNextStep="validateCurrentStepToNext"
          @onPreviousStep="previousStep"
        >
          <button
            v-if="selectedPaymentMethod === 'stripe'"
            class="
              p-4
              outline-none
              leading-8
              focus:outline-none
              ml-3
              font-semibold
              outline-none
              focus:outline-none
              text-white
              border-2 border-brand-light-blue
              bg-brand-light-blue
              w-full
              rounded-md
            "
            @click="handleSubmit"
          >
            {{ $t('helpEnvol.proceedToDonation') }}
          </button>
        </form-stepper>
      </template>
    </container-steps>
  </section>
</template>

<script>
import FormStepper from '@/components/donation/FormStepper';
import WrapperSteps from '@/components/donation/WrapperSteps';
import ContainerSteps from '@/components/donation/ContainerSteps';
import ResumeStep from '@/components/donation/ResumeStep';
import CustomerStep from '@/components/donation/CustomerStep';
import AmountStep from '@/components/donation/AmountStep';
import PaymentMethodStep from '@/components/donation/PaymentMethodStep';
/* eslint-disable */
//prettier-ignore
const regex = {
  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  full_name:/^([^0-9]*)$/,
};

const steps = [
  {
    number: 1,
    name: 'payment-method',
  },
  {
    number: 2,
    name: 'amount',
  },
  {
    number: 3,
    name: 'customer',
  },
  {
    number: 4,
    name: 'resume',
  },
];
export default {
  name: 'ModalContentDonation',
  components: {
    PaymentMethodStep,
    AmountStep,
    CustomerStep,
    ResumeStep,
    FormStepper,
    WrapperSteps,
    ContainerSteps,
  },
  props: {
    amounts: {
      type: Array,
      default: () => [],
    },
    intervals: {
      type: Array,
      default: () => [],
    },
    selectedPaymentMethod: {
      type: String,
      default: 'stripe',
    },
    selectedAmount: {
      type: Object,
      default: () => {},
    },
    selectedInterval: {
      type: Object,
      default: () => {},
    },
    isCustomAmount: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      steps,
      currentStep: {},
      hasCommentary: false,
      isDonationFromCompany: false,
      company_name: '',
      commentary: '',
      email: '',
      full_name: '',
      errors: {
        amount: [],
        customer: [],
      },
    };
  },

  created() {
    this.currentStep = steps[0];
  },

  methods: {
    validateCurrentStepToNext() {
      if (!this.isStepValid(this.currentStep.name)) return;
      this.nextStep();
    },
    nextStep() {
      const nextStep = this.steps.find(
        (x) => x.number === this.currentStep.number + 1
      );
      this.currentStep = nextStep;
      if (nextStep.number === 4 && this.selectedPaymentMethod === 'paypal') {
        this.handleSubmit();
      }
    },
    previousStep() {
      const previousStep = this.steps.find(
        (x) => x.number === this.currentStep.number - 1
      );
      this.currentStep = previousStep;
    },
    handleSelectAmount(value) {
      this.$emit('onSelectAmount', value);
      this.$emit('onCustomAmountEntry',false);
    },
    handleSelectInterval(value) {
      this.$emit('onSelectInterval', value);
    },
    handleCustomAmount(value) {
      const amount = parseInt(value);
      const amountObject = this.verifyCustomAmountIsNotMainAmounts(amount)
      this.$emit('onSelectAmount', amountObject);
    },

    verifyCustomAmountIsNotMainAmounts(amount){
      const mainAmount = this.amounts.find(x => x.amount === amount * 100)
      if(mainAmount){
        return mainAmount
      } else {
      this.$emit('onCustomAmountEntry',true);
      return { id: null, amount: amount * 100 }
      }
    },

    isStepValid(step) {
      const errors = [];
      if (step === 'amount') {
        if (!this.selectedAmount.amount) {
          errors.push(this.$t('helpEnvol.formError.pleaseSelectAmount'));
        } else if (this.selectedAmount.amount < 10) {
          errors.push(this.$t('helpEnvol.errorMinimalDonation'));
        }
      }

      if (step === 'customer') {
        if (!this.full_name) {
          errors.push(this.$t('helpEnvol.formError.fullNameRequired'));
        } else if (!regex.full_name.test(this.full_name)) {
          errors.push(this.$t('helpEnvol.formError.fullNameInvalid'));
        }
        if (!this.email) {
          errors.push(this.$t('helpEnvol.formError.emailRequired'));
        } else if (!regex.email.test(this.email)) {
          errors.push(this.$t('helpEnvol.formError.emailInvalid'));
        }

        if (this.isDonationFromCompany && !this.company_name) {
          errors.push(this.$t('helpEnvol.formError.companyToDonateRequired'));
        }

        if (this.hasCommentary && !this.commentary) {
          errors.push(this.$t('helpEnvol.formError.commentaryRequired'));
        }
      }

      this.errors[step] = errors;
      return errors.length < 1;
    },
    handleSubmit() {
      const data = {
        full_name: this.full_name,
        company_name: this.company_name,
        commentary: this.commentary,
        email: this.email,
        payment_method: this.selectedPaymentMethod,
      };
      this.$emit('handleSubmit', data);
    },
  },
};
</script>
<style lang="scss">
.form-donation {
  min-height: 30rem;
  @apply flex items-center justify-center;

  @screen md {
    min-height: 35rem;
  }
}
</style>
