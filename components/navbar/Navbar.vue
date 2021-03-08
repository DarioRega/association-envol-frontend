<template>
  <section>
    <mobile-navbar-layout
      v-show="isMobile"
      class="xl:hidden"
      :is-menu-open="isMenuOpen"
      :navigation-links="navigationLinks"
      @toggleMenu="toggleMenu"
      @closeMenu="closeMenu"
    />
    <desktop-navbar-layout
      class="hidden xl:block"
      :navigation-links="navigationLinks"
    />
  </section>
</template>
<script>
import MobileNavbarLayout from '~/components/navbar/MobileNavbarLayout';
import DesktopNavbarLayout from '~/components/navbar/DesktopNavbarLayout';
export default {
  name: 'Navbar',
  components: { MobileNavbarLayout, DesktopNavbarLayout },
  data() {
    return {
      isMenuOpen: false,
      navigationLinks: [],
    };
  },
  computed: {
    isMobile() {
      if (process.client) {
        return window.innerWidth < 1300;
      }
      return false;
    },
  },
  mounted() {
    this.navigationLinks = this.$t('pages');
  },
  methods: {
    closeMenu() {
      this.isMenuOpen = false;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
