<template>
  <section class="relative flex justify-center items-center">
    <container-steps class="relative">
      <!--      <template v-slot:stateDonation>-->
      <!--        <donation-feedback v-if="isSubmitting || hasFeedback" />-->
      <!--      </template>-->
      <template v-slot:form>
        <wrapper-steps>
          <form>
            <main-step
              v-if="currentStep.number === 1"
              :intervals="intervals"
              :selected-interval="selectedInterval"
              :amounts="amounts"
              :selected-amount="selectedAmount"
              :commentary="commentary"
              :custom-amount="customAmount"
              :has-commentary="hasCommentary"
              :errors="errors"
              :is-donation-from-company="isDonationFromCompany"
              @onAmountSelect="handleSelectAmount"
              @onIntervalSelect="handleSelectInterval"
              @onHasCommentary="hasCommentary = $event"
              @onCommentary="commentary = $event"
              @onCustomAmount="handleCustomAmount"
              @onDonationFromCompany="isDonationFromCompany = $event"
              @onCompanyName="company_name = $event"
            />
            <resume-step
              v-if="currentStep.number === 2"
              :selected-amount="selectedAmount"
              :selected-interval="selectedInterval"
              :has-commentary="hasCommentary"
              :commentary="commentary"
              :is-donation-from-company="isDonationFromCompany"
              :company_name="company_name"
            />
          </form>
        </wrapper-steps>
      </template>
      <template v-slot:stepper>
        <form-stepper
          :current-step="currentStep.number"
          :total-steps="steps.length"
          class="px-5 lg:px-0 pb-10 max-w-lg lg:max-w-xl mx-auto w-full flex space-between"
          @onNextStep="validateCurrentStepToNext"
          @onPreviousStep="previousStep"
        >
          <button
            class="p-4 outline-none focus:outline-none ml-3 font-semibold outline-none focus:outline-none text-white border-2 border-brand-light-blue bg-brand-light-blue w-full rounded-md"
            @click="handleSubmit"
          >
            Procéder au don
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
import MainStep from '@/components/donation/MainStep';
import ResumeStep from '@/components/donation/ResumeStep';

const steps = [
  {
    number: 1,
    name: 'main',
  },
  {
    number: 2,
    name: 'resume',
  },
];
export default {
  name: 'ModalContentDonation',
  components: {
    ResumeStep,
    FormStepper,
    WrapperSteps,
    ContainerSteps,
    MainStep,
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
    selectedAmount: {
      type: Object,
      default: () => {},
    },
    selectedInterval: {
      type: Object,
      default: () => {},
    },
    customAmount: {
      type: [Number, null],
      default: null,
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
      errors: [],
    };
  },

  created() {
    this.currentStep = steps[0];
  },

  methods: {
    validateCurrentStepToNext() {
      if (this.currentStep.name === 'main') {
        if (!this.isMainStepValid()) return;
      }
      this.nextStep();
    },
    nextStep() {
      const nextStep = this.steps.find(
        (x) => x.number === this.currentStep.number + 1
      );
      this.currentStep = nextStep;
    },
    previousStep() {
      const previousStep = this.steps.find(
        (x) => x.number === this.currentStep.number - 1
      );
      this.currentStep = previousStep;
    },
    handleSelectAmount(value) {
      this.$emit('onSelectAmount', value);
    },
    handleSelectInterval(value) {
      this.$emit('onSelectInterval', value);
    },
    handleCustomAmount(value) {
      const amount = parseInt(value);
      this.$emit('onSelectAmount', { id: null, amount });
      this.$emit('onCustomAmount', amount);
    },
    isMainStepValid() {
      const errors = [];
      if (!this.selectedAmount.amount) {
        errors.push('Veuillez sélectionner un montant.');
      } else if (this.selectedAmount.amount < 10) {
        errors.push('Les dons minimaux sont de 10 CHF.');
      }

      if (this.isDonationFromCompany && !this.company_name) {
        errors.push(
          "Le champs donations pour le compte d'une entreprise est requis."
        );
      }

      if (this.hasCommentary && !this.commentary) {
        errors.push('Le champs commentaire est requis.');
      }

      this.errors = errors;
      return errors.length < 1;
    },
    handleSubmit() {
      this.$emit('handleSubmit');
    },
  },
};
</script>
