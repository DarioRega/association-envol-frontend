<template>
  <nav class="shadow w-full relative h-32">
    <div
      class="max-w-7xl h-full w-full mx-auto px-6 lg:px-10 2xl:px-0 transition-color duration-1000"
      :style="{ maxWidth: '1400px', margin: '0 auto' }"
    >
      <div
        class="flex justify-between h-full items-center px-6 md:px-10 lg:px-0 lg:flex-1"
      >
        <!--        LG MENU -->

        <div class="flex px-2 lg:px-0 w-auto lg:w-full">
          <div
            class="flex-shrink-0 w-full max-w-xs flex items-center lg:flex-none"
          >
            <!--            LOGO -->
            <!--            ADD IMAGES AND ASSETS TO STATIC FOLDER AND USE PICTURE WITHOUT ~/ only /logo.svg-->
            <div class="mx-auto">
              <picture srcset="/assets/images/logo.svg" type="image/svg+xml">
                <img src="~/assets/images/logo.png" />
              </picture>
            </div>
          </div>

          <div class="lg:ml-2 xl:ml-6 lg:w-full">
            <main-navigation
              :navigation-links="navigationLinks"
              @closeMenu="$emit('closeMenu')"
            />
          </div>
        </div>
        <div
          class="lg:flex lg:items-center flex-none w-64 xl:w-full xl:max-w-sm ml-auto justify-center"
        >
          <div class="relative w-full flex-shrink-0 xxl:w-full">
            <div class="flex items-center justify-end">
              <donate-envol />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import MainNavigation from '~/components/navbar/MainNavigation';
import DonateEnvol from '~/components/navbar/DonateEnvol';
export default {
  name: 'DesktopNavbarLayout',
  components: { MainNavigation, DonateEnvol },
  props: {
    navigationLinks: {
      type: Array,
      required: true,
    },
  },
};
</script>
