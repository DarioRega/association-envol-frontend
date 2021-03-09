<template>
  <div class="flex flex-wrap flex-col md:flex-row justify-center items-stretch">
    <div
      v-for="(item, index) in list"
      :key="item.name"
      class="comitee-card relative my-8 md:my-10 mx-8 rounded-lg shadow-md bg-brand-main-gray px-8 py-8 flex items-center"
    >
      <div class="flex-shrink-0 hidden xl:block">
        <div class="w-24 h-24 bg-brand-dark-blue rounded-full">
          <div class="flex items-center text-white h-full justify-center">
            <icon name="user" size="125" />
          </div>
        </div>
      </div>
      <div class="flex-1 min-w-0 xl:pl-12">
        <p>{{ item.name }}</p>
        <p class="text-brand-dark-gray font-light">{{ item.function }}</p>
        <a
          :href="`mailto:${item.mail}`"
          class="font-light hidden xl:inline-flex items-center cursor-pointer hover:text-brand-dark-gray pt-2"
          ><icon name="email" class="mr-4 text-current" size="75" />{{
            item.mail
          }}</a
        >
        <div
          class="xl:hidden text-center"
          :class="index === 0 ? 'md:mt-20' : 'mt-8'"
        >
          <a
            :href="`mailto:${item.mail}`"
            class="contact-cta inline-block py-3 px-4 bg-brand-light-blue text-white rounded-md"
            >{{ $t('contactHer') }} <icon name="email" class="ml-4" size="75"
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
.comitee-card {
  @screen md {
    flex: 0 0 calc(48% - 4rem);
  }
}
.contact-cta {
  font-size: 14px;
}
</style>
