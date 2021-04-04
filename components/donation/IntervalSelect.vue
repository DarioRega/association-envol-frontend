<template>
  <div
    class="border-2 border-transparent h-20 flex items-center justify-between cursor-pointer"
  >
    <div
      v-for="(item, index) in options"
      :key="item.id"
      class="w-1/3 h-full flex items-center justify-center border-t border-b"
      :class="[
        selectedOption.id === item.id
          ? 'text-white bg-brand-dark-blue border-brand-dark-blue'
          : 'text-brand-carbon border-brand-variant-main-gray bg-white',
        index === 0 && 'border-r border-l rounded-l-md',
        index === 2 && 'border-l border-r rounded-r-md',
      ]"
      @click="$emit('click', item)"
    >
      <div class="flex justify-center items-center">
        <p class="font-normal text-current">
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntervalSelect',
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
