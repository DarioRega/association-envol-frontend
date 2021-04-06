<template>
  <section>
    <ul v-show="errors.length > 0" class="mb-10 mt-6 list-inside">
      <li
        v-for="error in errors"
        :key="error"
        class="list-disc mb-2 text-brand-error caption-lg font-semibold tracking-wide"
      >
        {{ error }}
      </li>
    </ul>
    <h5 class="font-medium text-brand-dark-blue mb-20">Montant</h5>
    <interval-select
      :options="intervals"
      :selected-option="selectedInterval"
      class="flex justify-center items-center"
      @click="$emit('onIntervalSelect', $event)"
    />

    <amount-select
      :options="amounts"
      :selected-option="selectedAmount"
      class="mt-10 md:mt-16"
      @click="$emit('onAmountSelect', $event)"
    />

    <div class="flex mt-10 mb-1">
      <div
        class="rounded-md border-2 h-20 w-full flex items-center justify-start px-3 md:px-4 cursor-pointer"
        :class="[
          customAmount === selectedAmount.amount
            ? 'shadow-md text-white bg-brand-dark-blue border-brand-dark-blue'
            : 'text-brand-carbon bg-white border-brand-variant-main-gray',
        ]"
        @click="handleCustomClick"
      >
        <p class="caption-lg mr-2 text-current">CHF</p>
        <input
          min="10"
          :value="customAmount"
          placeholder="Montant personnalisé"
          type="number"
          class="p pl-1 outline-none outline-none overflow-scroll text-current"
          :class="[
            customAmount === selectedAmount.amount && 'bg-brand-dark-blue',
            customAmount ? 'placeholder-white' : 'placeholder-brand-carbon',
          ]"
          @change="$emit('onCustomAmount', $event.target.value)"
        />
      </div>
    </div>
    <label
      v-if="selectedAmount.amount === customAmount && customAmount < 10"
      class="caption-sm pt-2"
      >Les dons minimaux sont de 10 CHF</label
    >
  </section>
</template>

<script>
import IntervalSelect from '@/components/donation/IntervalSelect';
import AmountSelect from '@/components/donation/AmountSelect';
export default {
  name: 'AmountStep',
  components: { AmountSelect, IntervalSelect },
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
      required: true,
    },
    selectedInterval: {
      type: Object,
      required: true,
    },

    customAmount: {
      type: Number,
      default: null,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleCustomClick() {
      if (this.customAmount) {
        this.$emit('onProductSelect', { id: null, amount: this.customAmount });
      }
    },
  },
};
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
