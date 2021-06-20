<template>
  <div>
    <h5 class="font-medium text-brand-dark-blue mb-20">
      {{ $t('helpEnvol.subTitles.resume') }}
    </h5>
    <div class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">
        {{ $t('helpEnvol.amountOfDonationChoosen') }} :
      </p>
      <p class="inline-flex font-semibold">
        {{ selectedAmount.amount / 100 }}
        CHF
      </p>
    </div>
    <div class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">{{ $t('helpEnvol.interval') }} :</p>
      <p class="inline-flex font-semibold">{{ selectedInterval.name }}</p>
    </div>
    <div class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">
        {{ $t('helpEnvol.personOfReference') }} :
      </p>
      <p class="inline-flex font-semibold">{{ full_name }}</p>
    </div>
    <div class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">{{ $t('formLabels.email') }} :</p>
      <p class="inline-flex font-semibold">{{ email }}</p>
    </div>
    <div v-if="company_name && isDonationFromCompany" class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">
        {{ $t('helpEnvol.companyOfReference') }} :
      </p>
      <p class="inline-flex font-semibold">{{ company_name }}</p>
    </div>
    <div v-if="commentary && hasCommentary" class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">
        {{ $t('formLabels.commentary') }} :
      </p>
      <p class="inline-flex font-semibold">{{ commentary }}</p>
    </div>
    <div class="mt-4">
      <p>
        {{ $t('helpEnvol.explainRedirect.1') }}
        <i>{{
          selectedPaymentMethod === 'stripe'
            ? $t('helpEnvol.explainRedirect.2')
            : $t('helpEnvol.explainRedirect.2a')
        }}</i
        >, {{ $t('helpEnvol.explainRedirect.3') }}
        <b>{{ $t('helpEnvol.explainRedirect.4') }}</b>
        {{ $t('helpEnvol.explainRedirect.5') }}.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumeStep',
  props: {
    selectedAmount: {
      type: Object,
      required: true,
    },
    selectedInterval: {
      type: Object,
      required: true,
    },
    selectedPaymentMethod: {
      type: String,
      required: true,
    },
    commentary: {
      type: String,
      default: '',
    },
    // eslint-disable-next-line vue/prop-name-casing
    company_name: {
      type: String,
      default: '',
    },
    // eslint-disable-next-line vue/prop-name-casing
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hasCommentary: {
      type: Boolean,
      default: false,
    },
    isDonationFromCompany: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
