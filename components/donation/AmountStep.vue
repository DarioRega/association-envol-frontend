<template>
  <section>
    <ul v-show="errors.length > 0" class="mb-10 mt-6 list-inside">
      <li
        v-for="error in errors"
        :key="error"
        class="
          list-disc
          mb-2
          text-brand-error
          caption-lg
          font-semibold
          tracking-wide
        "
      >
        {{ error }}
      </li>
    </ul>
    <h5 class="font-medium text-brand-dark-blue mb-20">
      {{ $t('helpEnvol.subTitles.amount') }}
    </h5>
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
        class="
          rounded-md
          border-2
          h-20
          w-full
          flex
          items-center
          justify-start
          px-3
          md:px-4
          cursor-pointer
        "
        :class="[
          isCustomAmount
            ? 'shadow-md text-white bg-brand-dark-blue border-brand-dark-blue'
            : 'text-brand-carbon bg-white border-brand-variant-main-gray',
        ]"
        @click="handleCustomClick"
      >
        <p class="caption-lg mr-2 text-current">CHF</p>
        <input
          min="10"
          :value="isCustomAmount ? selectedAmount.amount / 100 : ''"
          :placeholder="$t('helpEnvol.customAmount')"
          type="number"
          class="p pl-1 outline-none outline-none overflow-scroll text-current"
          :class="[
            isCustomAmount && 'bg-brand-dark-blue',
            isCustomAmount && selectedAmount.amount
              ? 'placeholder-white'
              : 'placeholder-brand-carbon',
          ]"
          @change="$emit('onCustomAmount', $event.target.value)"
        />
      </div>
    </div>
    <label
      v-if="isCustomAmount && selectedAmount.amount < 1000"
      class="caption-sm pt-2"
      >{{ $t('helpEnvol.errorMinimalDonation') }}</label
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

    isCustomAmount: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleCustomClick() {
      if (this.isCustomAmount) {
        this.$emit('onAmountSelect', { id: null, amount: this.selectedAmount });
      }
    },
  },
};
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  appearance: textfield;
}
</style>
