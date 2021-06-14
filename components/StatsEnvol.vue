<template>
  <div class="text-center">
    <h2 class="font-medium text-brand-dark-blue tracking-wider stats-value">
      {{ shouldAnimate ? displayNumber : 0 }}
    </h2>
    <h4 class="lg:hidden">{{ text }}</h4>
    <h5 class="hidden lg:block">{{ text }}</h5>
  </div>
</template>

<script>
export default {
  name: 'StatsEnvol',
  components: {},
  props: {
    number: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    shouldAnimate: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      displayNumber: 0,
      interval: false,
    };
  },
  watch: {
    shouldAnimate(newValue, oldValue) {
      if (newValue) {
        this.animateNumbers();
      }
    },
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    animateNumbers() {
      this.interval = window.setInterval(() => {
        if (this.displayNumber !== this.number) {
          let change = (this.number - this.displayNumber) / 20;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.displayNumber = this.displayNumber + change;
        }
      }, 20);
    },
  },
};
</script>
