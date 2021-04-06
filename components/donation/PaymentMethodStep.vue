<template>
  <section>
    <h5 class="font-medium text-brand-dark-blue mt-10 mb-20">
      Méthode de paiement
    </h5>
    <div class="flex flex-col lg:flex-row lg:justify-between items-stretch">
      <div class="w-full lg:w-1/2 lg:pr-6 border-r">
        <button
          class="method-container h-full"
          :class="selectedPaymentMethod === 'paypal' && 'selected'"
          @click="handlePaymentMethodClick($event, 'paypal')"
        >
          <img
            src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_150x38.png"
            alt="PayPal"
          />
        </button>
      </div>
      <div class="w-full lg:w-1/2 lg:pl-6 border-l">
        <button
          class="method-container"
          :class="selectedPaymentMethod === 'stripe' && 'selected'"
          @click="handlePaymentMethodClick($event, 'stripe')"
        >
          <div class="w-full mx-auto text-center">
            <img
              src="~/assets/images/stripe-logo.png"
              class="w-48 mx-auto"
              alt="stripe"
            />
            <img
              src="~/assets/images/amex-visa-mastercard-v2.png"
              class="w-64 mx-auto"
              alt="credits-cards"
            />
            <div class="flex justify-center items-center w-full">
              <img
                src="~/assets/images/apple-pay-logo.png"
                class="w-24 my-4 lg:mr-4"
                alt="apple pay"
              />
              <img
                src="~/assets/images/gpay-logo.png"
                class="w-24 my-4 lg:ml:4"
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
  @apply w-full rounded-md cursor-pointer flex items-center justify-center py-20 outline-none;
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
