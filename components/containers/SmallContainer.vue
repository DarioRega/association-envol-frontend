<template>
  <section
    class="small-container px-12 sm:px-0 sm:w-9/12 lg:w-3/5 mx-auto w-full"
    :class="extraSpacing ? 'pt-10 pb-10 md:pb-16 lg:pb-20 2xl:pb-24' : 'py-10'"
  >
    <slot />
  </section>
</template>

<script>
export default {
  name: 'SmallContainer',
  props: {
    extraSpacing: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
.small-container {
  max-width: 900px;
}
</style>
