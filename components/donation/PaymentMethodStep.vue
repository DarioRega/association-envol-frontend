<template>
  <section>
    <h5 class="font-medium text-brand-dark-blue mt-10 mb-20">
      {{ $t('helpEnvol.subTitles.paymentMethod') }}
    </h5>
    <div class="flex flex-col lg:flex-row lg:justify-between items-stretch">
      <div
        class="w-full lg:w-1/2 pb-4 lg:pb-0 lg:pr-6 border-b lg:border-b-0 lg:border-r"
      >
        <button
          class="method-container py-20 h-full"
          :class="selectedPaymentMethod === 'paypal' && 'selected'"
          @click="handlePaymentMethodClick($event, 'paypal')"
        >
          <img
            class="w-56 lg:w-64"
            src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_150x38.png"
            alt="PayPal"
          />
        </button>
      </div>
      <div
        class="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l"
      >
        <button
          class="method-container py-14 lg:py-20"
          :class="selectedPaymentMethod === 'stripe' && 'selected'"
          @click="handlePaymentMethodClick($event, 'stripe')"
        >
          <div class="w-full mx-auto text-center">
            <img
              src="~/assets/images/stripe-logo.png"
              class="w-32 lg:w-48 mx-auto"
              alt="stripe"
            />
            <img
              src="~/assets/images/amex-visa-mastercard-v2.png"
              class="w-56 lg:w-64 mx-auto"
              alt="credits-cards"
            />
            <div class="flex justify-center items-center w-full">
              <img
                src="~/assets/images/apple-pay-logo.png"
                class="w-20 my-4 mr-4"
                alt="apple pay"
              />
              <img
                src="~/assets/images/gpay-logo.png"
                class="w-24 my-4 ml:4"
                alt="google pay"
              />
            </div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PaymentMethodStep',
  props: {
    selectedPaymentMethod: {
      type: String,
      default: 'stripe',
    },
  },
  methods: {
    handlePaymentMethodClick(evt, methodSelected) {
      evt.preventDefault();
      this.$emit('onPaymentMethod', methodSelected);
    },
  },
};
</script>
<style lang="scss" scoped>
.method-container {
  @apply w-full rounded-md cursor-pointer flex items-center justify-center  outline-none;
  &:hover {
    @apply bg-brand-variant-main-gray;
  }
  &:focus {
    @apply outline-none;
  }
  &.selected {
    @apply bg-brand-main-gray;
  }
}
</style>
