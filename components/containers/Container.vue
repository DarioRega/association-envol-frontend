<template>
  <section
    class="container px-12 xl:px-0 w-full md:w-11/12 xl:w-10/12 xxl:w-full mx-auto"
    :class="extraSpacing ? 'pt-10 pb-10 md:pb-16 lg:pb-20 xl:pb-24' : 'py-10'"
  >
    <slot />
  </section>
</template>
<script>
export default {
  name: 'Container',
  props: {
    extraSpacing: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
.container {
  max-width: 1400px;
}
</style>
