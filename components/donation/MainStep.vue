<template>
  <section>
    <ul v-show="errors.length > 0" class="mb-16">
      <li
        v-for="error in errors"
        :key="error"
        class="list-disc mb-2 text-brand-error caption-lg font-semibold tracking-wide"
      >
        {{ error }}
      </li>
    </ul>

    <interval-select
      :options="intervals"
      :selected-option="selectedInterval"
      class="flex justify-center items-center mb-10"
      @click="$emit('onIntervalSelect', $event)"
    />

    <amount-select
      :options="amounts"
      :selected-option="selectedAmount"
      @click="$emit('onAmountSelect', $event)"
    />

    <div class="flex mt-8 lg:mt-14 mb-1">
      <div
        class="rounded-md border-2 h-12 md:h-16 lg:h-20 w-full flex items-center justify-start px-3 md:px-4 cursor-pointer"
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
          class="h6 outline-none outline-none w-56 overflow-scroll md:w-auto"
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
      :class="
        errors.includes('customAmount')
          ? 'text-brand-error'
          : 'text-brand-carbon'
      "
      >Les dons minimaux sont de 10 CHF</label
    >

    <div class="mt-10">
      <div class="relative flex items-center">
        <div class="flex items-center h-5">
          <input
            :value="isDonationFromCompany"
            :checked="isDonationFromCompany"
            type="checkbox"
            class="cursor-pointer h-6 w-6 border-brand-variant-main-gray rounded-md"
            @click="$emit('onDonationFromCompany', !isDonationFromCompany)"
          />
        </div>
        <div class="ml-3">
          <label
            class="caption-lg font-medium text-brand-carbon cursor-pointer"
            @click="$emit('onDonationFromCompany', !isDonationFromCompany)"
            >Ce don est pour le compte d'une entreprise</label
          >
        </div>
      </div>
      <transition-expand>
        <div v-show="isDonationFromCompany">
          <div class="mt-5">
            <input
              type="text"
              :value="company_name"
              class="w-full border-2 rounded-md outline-none focus:outline-none border-2 placeholder-brand-carbon p-2 transition-colors duration-500 px-4 h-12 md:h-16 lg:h-20"
              placeholder="Société donatrice"
              @change="$emit('onCompanyName', $event.target.value)"
            />
          </div>
        </div>
      </transition-expand>
    </div>

    <div class="mt-10">
      <div class="relative flex items-center">
        <div class="flex items-center h-6">
          <input
            :value="hasCommentary"
            :checked="hasCommentary"
            type="checkbox"
            class="cursor-pointer h-6 w-6 border-brand-variant-main-gray rounded-md"
            @click="$emit('onHasCommentary', !hasCommentary)"
          />
        </div>
        <div class="ml-3">
          <label
            class="caption-lg font-medium text-brand-carbon cursor-pointer"
            @click="$emit('onHasCommentary', !hasCommentary)"
            >Laisser un commentaire</label
          >
        </div>
      </div>
      <transition-expand>
        <div v-show="hasCommentary">
          <div class="mt-5">
            <textarea
              rows="4"
              :value="commentary"
              class="shadow-sm focus:outline-none p-3 block w-full p sm: border-brand-variant-main-gray border-2 rounded-md"
              placeholder="Votre commentaire"
              @change="$emit('onCommentary', $event.target.value)"
            ></textarea>
          </div>
        </div>
      </transition-expand>
    </div>
  </section>
</template>

<script>
import TransitionExpand from '@/components/TransitionExpand';
import IntervalSelect from '@/components/donation/IntervalSelect';
import AmountSelect from '@/components/donation/AmountSelect';
export default {
  name: 'MainStep',
  components: { AmountSelect, IntervalSelect, TransitionExpand },
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
    commentary: {
      type: String,
      default: '',
    },
    company_name: {
      type: String,
      default: '',
    },
    customAmount: {
      type: Number,
      default: null,
    },
    hasCommentary: {
      type: Boolean,
      default: false,
    },
    isDonationFromCompany: {
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
