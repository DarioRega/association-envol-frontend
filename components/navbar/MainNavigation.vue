<template>
  <div
    class="flex items-start lg:mt-0 md:items-center lg:items-center justify-center lg:block lg:h-full"
  >
    <!--    MOBILE -->
    <div class="lg:hidden flex-col w-full">
      <ul class="lg:hidden text-center">
        <li
          v-for="link in navigationLinks"
          :key="`${link.slug}-${generateRandomKey}`"
          class="text-brand-dark-blue mb-6"
        >
          <nuxt-link
            :to="`/${link.slug}`"
            exact-active-class="font-bold underline"
            class="text-current font-semibold text-state-white inline-block my-4 no-underline focus:outline-none transition duration-150 ease-in-out"
            @click.native="$emit('closeMenu')"
          >
            {{ link.name }}
          </nuxt-link>
        </li>
      </ul>
      <div class="lg:hidden mt-8 pt-6 w-full text-center">
        <donate-envol @closeMenu="$emit('closeMenu')" />
      </div>
    </div>

    <!--    DESKTOP -->
    <ul class="text-center hidden lg:flex items-center justify-start h-full">
      <li
        v-for="link in navigationLinks"
        :key="`${link.slug}-${generateRandomKey}`"
        class="relative text-brand-carbon"
      >
        <nuxt-link
          :to="`/${link.slug}`"
          exact-active-class="font-bold text-brand-dark-blue"
          class="text-2xl xl:text-3xl hover-link font-semibold lg:ml-4 xl:ml-8 inline-flex items-center px-1 pt-1 no-underline focus:outline-none transition duration-150 ease-in-out"
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
