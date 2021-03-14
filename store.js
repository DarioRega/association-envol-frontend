import Vue from 'vue';

const state = Vue.observable({
  isMenuOpen: false,
  shouldCloseNotificationGlobal: undefined,
});

export const closeMenu = () => (state.isMenuOpen = false);
export const toggleMenu = () => (state.isMenuOpen = !state.isMenuOpen);

export const triggerCloseGlobalNotification = () => {
  state.shouldCloseNotificationGlobal = true;
};

export const refreshGlobalNotificationState = () => {
  state.shouldCloseNotificationGlobal = undefined;
};
export default state;
