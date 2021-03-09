<template>
  <div class="grid grid-cols-1 gap-12 sm:grid-cols-2">
    <div
      v-for="item in list"
      :key="item.name"
      class="relative rounded-lg shadow-md bg-brand-main-gray px-8 py-8 flex items-center hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
    >
      <div class="flex-shrink-0 hidden lg:block">
        <div class="w-20 h-20 bg-brand-dark-blue rounded-full">
          <div class="flex items-center text-white h-full justify-center">
            <icon name="user" size="100" />
          </div>
        </div>
      </div>
      <div class="flex-1 min-w-0 lg:pl-6">
        <span class="absolute inset-0" aria-hidden="true"></span>
        <p>{{ item.name }}</p>
        <p class="text-brand-dark-gray font-light">{{ item.function }}</p>
        <p class="font-light hidden">{{ item.mail }}</p>
        <div class="mt-8 text-center">
          <a
            :href="`mailto:${item.mail}`"
            class="contact-cta inline-block py-3 px-4 bg-brand-light-blue text-white rounded-md"
            >Contacter <icon name="email" class="ml-4" size="75"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComiteeGrid',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log('THIS PORPS LIST', this.list);
  },
};
</script>
<style lang="scss" scoped>
.contact-cta {
  font-size: 14px;
}
</style>
