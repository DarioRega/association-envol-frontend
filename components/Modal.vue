<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <modal-wrapper
      :is-modal-open="isModalOpen"
      @closeModal="$emit('closeModal')"
    >
      <div
        class="
          w-full
          inline-block
          align-bottom
          bg-secondary
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle
          px-6
          md:px-0 md:max-w-4xl
          lg:max-w-5xl
        "
        :class="fluid ? 'xl:max-w-6xl' : 'xl:max-w-3xl'"
      >
        <slot />
      </div>
    </modal-wrapper>
  </transition>
</template>

<script>
import ModalWrapper from './ModalWrapper';
export default {
  name: 'ModalContent',
  components: { ModalWrapper },
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
    fluid: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
