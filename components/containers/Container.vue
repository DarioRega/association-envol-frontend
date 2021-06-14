<template>
  <section
    class="mx-auto"
    :class="[
      extraSpacing ? 'pt-10 pb-10 md:pb-16 lg:pb-20 2xl:pb-24' : 'py-10',
      fluid
        ? 'w-full'
        : 'app-container px-12 sm:px-0 sm:w-9/12 lg:px-0 w-full md:w-10/12 lg:w-9/12 xl:w-8/12 3xl:w-full',
    ]"
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
    fluid: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
.app-container {
  max-width: 1400px;
}
</style>
