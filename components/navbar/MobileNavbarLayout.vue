<template>
  <nav class="w-full h-24 relative" :style="{ zIndex: 888 }">
    <div class="h-full">
      <transition
        enter-active-class="ease-in-out duration-100"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in-out duration-500 delay-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="!isMenuOpen"
          class="navbar-padding h-full flex justify-between items-center"
        >
          <div class="flex-shrink-0 flex items-center w-24 md:w-32">
            <picture
              :srcset="require(`~/assets/images/logo.svg`)"
              type="image/svg+xml"
            >
              <img :src="require(`~/assets/images/logo.png`)" />
            </picture>
          </div>
          <!-- Mobile menu button -->
          <button
            class="inline-flex items-center justify-center p-2 hover:text-brand-gray focus:outline-none transition duration-150 ease-in-out"
            aria-expanded="false"
            @click="$emit('toggleMenu')"
          >
            <icon name="hamburger" class="text-brand-dark-blue" size="125" />
          </button>
        </div>
      </transition>

      <transition
        enter-active-class="transform transition ease-in-out duration-500 sm:duration-1000"
        enter-class="translate-x-full md:translate-x-0 md:-translate-y-full opacity-0"
        enter-to-class="translate-x-0 md:translate-y-0  opacity-100"
        leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
        leave-class="translate-x-0 md:translate-y-0  opacity-100"
        leave-to-class="translate-x-full md:translate-x-0 md:-translate-y-full opacity-0"
      >
        <div
          v-show="isMenuOpen"
          class="absolute top-0 w-full navbar-mobile-open bg-brand-main-gray"
        >
          <!--          mobile header -->
          <div
            class="flex-none h-24 navbar-padding flex justify-between items-center"
          >
            <h3 class="tracking-wider brand-title-shadow mb-0 pb-0">ENVOL</h3>
            <button
              class="inline-flex items-center justify-center p-2 hover:text-brand-gray focus:outline-none transition duration-150 ease-in-out"
              aria-expanded="false"
              @click="$emit('toggleMenu')"
            >
              <icon
                name="close"
                size="100"
                class="text-brand-dark-gray hover:text-brand-dark-gray"
              />
            </button>
          </div>

          <!--          mobile navigation -->
          <div class="lg:hidden flex-1 md:relative">
            <div class="pt-2 pb-3 w-full h-full flex flex-col justify-between">
              <main-navigation :navigation-links="navigationLinks" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
import MainNavigation from '~/components/navbar/MainNavigation';
export default {
  name: 'MobileNavbarLayout',
  components: { MainNavigation },
  props: {
    isMenuOpen: {
      type: Boolean,
      default: false,
    },
    navigationLinks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.navbar-padding {
  @apply px-6;
  @screen md {
    @apply px-10;
  }
}
.navbar-mobile-open {
  @apply h-screen overflow-hidden;
}
</style>
