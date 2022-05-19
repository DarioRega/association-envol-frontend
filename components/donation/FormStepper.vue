<template>
  <div>
    <button
      v-show="shouldShowPreviousStep"
      class="p-4 outline-none focus:outline-none font-semibold text-white border-2 border-brand-dark-blue bg-brand-dark-blue w-full rounded-md"
      :class="shouldShowNextStep || (currentStep === totalSteps && 'mr-3')"
      @click="$emit('onPreviousStep')"
    >
      <span class="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-3 w-8 h-8"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path
            d="M4.5 16.997c-.2 0-.389-.078-.53-.22l-3.75-3.75c-.07-.07-.125-.153-.163-.245-.003-.007-.006-.016-.009-.024-.031-.081-.048-.17-.048-.261 0-.089.016-.176.048-.261.002-.007.005-.014.008-.021.04-.097.095-.179.166-.249L3.97 8.217c.142-.142.33-.22.53-.22s.389.078.53.22c.142.141.22.33.22.53s-.078.389-.22.53l-2.47 2.47h20.69c.414 0 .75.336.75.75s-.336.75-.75.75H2.561l2.47 2.47c.142.142.22.33.22.53s-.078.389-.22.53c-.142.142-.331.22-.531.22z"
          />
        </svg>
        {{ $t('helpEnvol.previous') }}
      </span>
    </button>
    <button
      v-show="shouldShowNextStep"
      class="p-4 outline-none focus:outline-none font-semibold text-white border-2 border-brand-dark-blue bg-brand-dark-blue w-full rounded-md"
      :class="shouldShowPreviousStep && 'ml-3'"
      @click="$emit('onNextStep')"
    >
      <span class="flex items-center justify-center">
        {{ $t('helpEnvol.next') }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ml-3 w-8 h-8"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path
            d="M19.5 16.997c-.2 0-.389-.078-.53-.22s-.22-.33-.22-.53.078-.389.22-.53l2.47-2.47H.75c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h20.689l-2.47-2.47c-.142-.141-.22-.33-.22-.53s.078-.389.22-.53.33-.22.53-.22.389.078.53.22l3.75 3.75c.07.07.125.152.163.245.003.008.007.017.01.026.031.081.047.17.047.26 0 .087-.016.174-.047.258-.002.006-.004.011-.006.016-.042.104-.097.186-.167.256l-3.75 3.75c-.14.141-.329.219-.529.219z"
          />
        </svg>
      </span>
    </button>
    <slot v-if="currentStep === totalSteps" />
  </div>
</template>

<script>
export default {
  name: 'FormStepper',
  props: {
    currentStep: {
      type: Number,
      default: 1,
    },
    totalSteps: {
      type: Number,
      required: true,
    },
  },
  computed: {
    shouldShowNextStep() {
      return this.currentStep < this.totalSteps;
    },
    shouldShowPreviousStep() {
      return this.currentStep > 1;
    },
  },
};
</script>
