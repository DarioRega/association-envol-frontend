<template>
  <div class="flex flex-col min-h-screen">
    <navbar class="relative" :style="{ zIndex: 888 }" />
    <Nuxt v-show="!isMenuOpen" class="flex-grow" />
  </div>
</template>
<script>
import state from '@/store';
import Navbar from '~/components/navbar/Navbar';
export default {
  components: { Navbar },
  computed: {
    isMenuOpen() {
      return state.isMenuOpen;
    },
  },
};
</script>
