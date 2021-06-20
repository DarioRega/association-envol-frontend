<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="item.id"
        :class="index < 1 ? 'mb-12' : 'my-12'"
      >
        <div
          class="
            rounded-md
            border-4 border-brand-main-gray
            p-6
            transition-colors
            duration-500
          "
          :class="
            isOpen(item.id) ? 'bg-brand-main-gray' : 'bg-white cursor-pointer'
          "
          @click="handleClick(item.id)"
        >
          <div class="flex justify-between my-4">
            <h5
              class="hidden lg:block flex-1 font-normal pr-8"
              :class="
                isOpen(item.id) ? 'text-brand-dark-blue' : 'text-brand-carbon'
              "
            >
              {{ item.title }}
            </h5>
            <h4
              class="lg:hidden flex-1 font-normal pr-8"
              :class="
                isOpen(item.id) ? 'text-brand-dark-blue' : 'text-brand-carbon'
              "
            >
              {{ item.title }}
            </h4>
            <span
              :class="isOpen(item.id) ? 'opacity-0' : 'opacity-100'"
              class="
                flex-none
                w-12
                text-right
                transition-opacity
                duration-300
                delay-700
              "
            >
              <icon name="plus" size="75" />
            </span>
          </div>
          <accordion-content
            v-show="isOpen(item.id)"
            :is-open="isOpen(item.id)"
          >
            <p v-if="item.description">{{ item.description }}</p>

            <nuxt-content
              v-else
              :document="item"
              class="accordions-content outside-list"
            />
            <div v-if="item.isBourseForm">
              <div class="md:p-8 md:bg-white md:rounded-md">
                <transition-expand>
                  <form-contact
                    v-show="!isFormSubmitted"
                    type-of-form="bourse"
                    @onSuccess="isFormSubmitted = true"
                  />
                </transition-expand>
                <div v-show="isFormSubmitted">
                  <div
                    class="max-w-2xl w-full bg-white rounded-md overflow-hidden"
                  >
                    <div class="flex items-start justify-center p-4">
                      <icon
                        name="success"
                        size="100"
                        class="text-brand-success mr-5"
                      />
                      <p class="flex-1 font-medium">
                        {{ $t('requestSent') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </accordion-content>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AccordionContent from '@/components/AccordionContent';
import FormContact from '@/components/FormContact';
import TransitionExpand from '@/components/TransitionExpand';
export default {
  name: 'Accordions',
  components: { TransitionExpand, FormContact, AccordionContent },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isFormSubmitted: false,
      currentOpenAccordion: null,
    };
  },
  mounted() {
    this.currentOpenAccordion = this.list[0].id;
  },
  methods: {
    handleClick(id) {
      if (this.currentOpenAccordion !== id) {
        this.currentOpenAccordion = id;
      }
    },
    isOpen(id) {
      return this.currentOpenAccordion === id;
    },
  },
};
</script>
<style lang="scss">
.accordions-content a {
  @apply text-brand-dark-blue;
}
</style>
