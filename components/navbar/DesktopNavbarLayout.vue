<template>
  <nav class="shadow w-full relative" :style="{ zIndex: 888 }">
    <div
      class="max-w-7xl w-full mx-auto px-6 md:px-10 xl:px-24 transition-color duration-1000"
    >
      <div class="flex justify-between h-24 px-6 md:px-10 lg:px-0 lg:flex-1">
        <!--        LG MENU -->
        <div class="flex px-2 lg:px-0 w-auto lg:w-full">
          <div class="flex-shrink-0 flex items-center lg:flex-none lg:w-32">
            <!--            LOGO -->
            <div class="mx-auto">
              <picture
                :srcset="require(`~/assets/images/logo.svg`)"
                type="image/svg+xml"
              >
                <img :src="require(`~/assets/images/logo.png`)" />
              </picture>
            </div>
          </div>

          <div class="lg:ml-2 xl:ml-6 lg:w-full">
            <main-navigation :navigation-links="navigationLinks" />
          </div>
        </div>
        <div
          class="lg:flex lg:items-center flex-none w-64 xl:w-full xl:max-w-sm ml-auto justify-center"
        >
          <div class="relative w-full flex-shrink-0 xxl:w-full">
            <div class="flex items-center justify-end justify-around">
              SOUTENIR ENVOL
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import MainNavigation from '~/components/navbar/MainNavigation';
export default {
  name: 'DesktopNavbarLayout',
  components: { MainNavigation },
  props: {
    navigationLinks: {
      type: Array,
      required: true,
    },
  },
};
</script>
