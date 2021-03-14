<template>
  <notification-wrapper v-show="shouldShow">
    <div
      class="mx-auto max-w-2xl border border-brand-main-gray w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
    >
      <div class="p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <!-- Heroicon name: outline/check-circle -->
            <icon
              :name="type"
              size="100"
              :class="
                type === 'success' ? 'text-brand-success' : 'text-brand-error'
              "
            />
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
        <div class="mt-4 mb-4 px-2 leading-8 caption-lg" v-html="message"></div>
      </div>
    </div>
  </notification-wrapper>
</template>
<script>
import NotificationWrapper from '@/components/NotificationWrapper';
import state from '~/store';
export default {
  components: { NotificationWrapper },
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
