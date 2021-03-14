<template>
  <div
    v-show="shouldShow"
    :style="{ zIndex: 777, maxWidth: '1400px', margin: '0 auto' }"
    class="fixed inset-0 flex items-start justify-center px-6 md:px-10 xl:px-0 pt-32 xl:pt-40 pointer-events-none sm:justify-end"
  >
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        class="max-w-2xl border border-brand-main-gray w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <div class="p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <!-- Heroicon name: outline/check-circle -->
              <span v-if="type === 'success'">
                <svg
                  class="h-12 w-12 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span v-else>
                <svg
                  class="h-12 w-12 text-brand-error"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <h6 class="ml-5 flex-1 font-medium">
              {{ type === 'success' ? $t('success') : $t('error') }}
            </h6>

            <div class="ml-4 h-full flex items-center">
              <span
                class="block cursor-pointer bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="$emit('click')"
              >
                <span class="sr-only">Close</span>
                <!-- Heroicon name: solid/x -->
                <svg
                  class="h-8 w-8 md:w-10 md:h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div
            class="mt-4 mb-4 px-2 leading-8 caption-lg"
            v-html="message"
          ></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import state from '~/store';
export default {
  props: {
    type: {
      type: String,
      default: 'success',
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  computed: {
    shouldShow() {
      if (state.shouldCloseNotificationGlobal) return false;
      return this.isVisible;
    },
  },
};
</script>
