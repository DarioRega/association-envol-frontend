<template>
  <div class="flex flex-col min-h-screen">
    <navbar class="relative" :style="{ zIndex: 888 }" />
    <div v-show="!isMenuOpen" class="flex-grow">
      <Nuxt class="h-full" />
    </div>
  </div>
</template>
<script>
import state from '@/store';
import Navbar from '~/components/navbar/Navbar';

// TODO check animations aos on mobile how it render => index.vue, hero.vue, comitee.vue, soutenir-envol.vue
export default {
  components: { Navbar },
  computed: {
    isMenuOpen() {
      return state.isMenuOpen;
    },
  },
};
</script>
