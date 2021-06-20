<template>
  <div class="flex justify-between items-center">
    <div
      v-for="item in options"
      :key="item.id"
      class="
        border-2
        h-16
        lg:h-20
        flex
        items-center
        justify-center
        px-3
        md:px-4
        lg:px-8
        cursor-pointer
        rounded-md
      "
      :class="[
        selectedOption.id === item.id
          ? 'text-white bg-brand-dark-blue border-brand-dark-blue'
          : 'text-brand-carbon border-brand-variant-main-gray bg-white',
      ]"
      @click="$emit('click', item)"
    >
      <div v-if="item.amount" class="flex justify-center items-center">
        <p class="caption-lg mr-2 text-current">CHF</p>
        <h6 class="font-normal text-current">
          {{ item.amount / 100 }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AmountSelect',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selectedOption: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
