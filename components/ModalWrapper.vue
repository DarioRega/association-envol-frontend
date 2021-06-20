<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="
        flex
        items-center
        lg:items-end
        justify-center
        min-h-screen
        pt-4
        md:px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          :aria-hidden="!isModalOpen"
          @click="$emit('closeModal')"
        ></div>
      </transition>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        :aria-hidden="!isModalOpen"
        >&#8203;</span
      >
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <slot />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWrapper',
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleKeyDown(e) {
      if (e.keyCode === 27) {
        this.$emit('closeModal');
      }
    },
  },
};
</script>
