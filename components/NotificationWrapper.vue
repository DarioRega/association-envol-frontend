<template>
  <div
    :style="{ zIndex: 777, maxWidth: '1400px', margin: '0 auto' }"
    class="fixed inset-0 w-full h-full md:w-auto md:h-auto flex items-start justify-center px-6 md:px-10 xl:px-0 pt-32 xl:pt-40 pointer-events-none sm:justify-end"
  >
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <slot />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'NotificationWrapper',
};
</script>
