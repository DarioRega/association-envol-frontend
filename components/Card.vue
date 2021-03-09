<template>
  <div
    class="bg-brand-main-gray rounded-lg shadow-lg bg-white p-10 md:px-24 md:py-16 lg:px-16 lg:py-10"
  >
    <div class="flex items-center justify-start">
      <span class="flex-none w-24">
        <icon :name="iconName" :size="iconSize" />
      </span>
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    iconName: {
      type: String,
      required: true,
    },
    iconSize: {
      type: String,
      required: true,
    },
  },
};
</script>
