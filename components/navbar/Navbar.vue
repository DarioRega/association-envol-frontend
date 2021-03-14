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
import state, {
  closeMenu,
  toggleMenu,
  triggerCloseGlobalNotification,
} from '~/store';

export default {
  name: 'Navbar',
  components: { MobileNavbarLayout, DesktopNavbarLayout },
  data() {
    return {
      navigationLinks: [],
    };
  },
  computed: {
    isMenuOpen() {
      return state.isMenuOpen;
    },
    isMobile() {
      // TODO ADD WINDOW EVENT LISTENER
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
      closeMenu();
    },
    toggleMenu() {
      toggleMenu();
      triggerCloseGlobalNotification();
    },
  },
};
</script>
