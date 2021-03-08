<template>
  <div
    class="flex items-start mt-12 lg:mt-0 md:items-center lg:items-center justify-center xl:block lg:h-full"
  >
    <!--    MOBILE -->
    <div class="flex-col w-full md:-mt-24 lg:-mt-32">
      <ul class="xl:hidden text-center">
        <li
          v-for="link in navigationLinks"
          :key="`${link.slug}-${generateRandomKey}`"
          class="text-brand-dark-blue"
        >
          <nuxt-link
            :to="link.slug"
            exact-active-class="font-semibold underline"
            class="text-current text-state-white inline-block my-4 no-underline focus:outline-none transition duration-150 ease-in-out"
            @click.native="$emit('closeMenu')"
          >
            {{ link.name }}
          </nuxt-link>
        </li>
      </ul>
      <div class="xl:hidden mt-8 w-full text-center">
        <donate-envol class="max-w-xs w-full" />
      </div>
    </div>

    <!--    DESKTOP -->
    <ul class="text-center hidden xl:flex items-center justify-start h-full">
      <li
        v-for="link in navigationLinks"
        :key="`${link.slug}-${generateRandomKey}`"
        class="relative text-brand-carbon"
      >
        <nuxt-link
          :to="link.slug"
          exact-active-class="font-semibold text-brand-dark-blue"
          class="hover-link lg:ml-4 xl:ml-8 inline-flex items-center px-1 pt-1 no-underline focus:outline-none transition duration-150 ease-in-out"
        >
          {{ link.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import DonateEnvol from '~/components/navbar/DonateEnvol';
export default {
  name: 'MainNavigation',
  components: { DonateEnvol },
  props: {
    navigationLinks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    generateRandomKey() {
      return Math.floor(Math.random() * Math.floor(99999));
    },
  },
};
</script>
<style lang="scss">
.hover-link:hover {
  opacity: 0.4;
}
</style>
