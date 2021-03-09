<template>
  <div class="text-center">
    <animated-number
      :value="number"
      :duration="2000"
      :format-value="formatToPrice"
    />
    <h4>{{ text }}</h4>
  </div>
</template>

<script>
import AnimatedNumber from 'animated-number-vue';
export default {
  name: 'StatsEnvol',
  components: {
    AnimatedNumber,
  },
  props: {
    number: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    formatToPrice(value) {
      return `<h2 class="font-medium text-brand-dark-blue tracking-wider stats-value">${Number(
        value
      ).toFixed(0)}</h2>`;
    },
  },
};
</script>
