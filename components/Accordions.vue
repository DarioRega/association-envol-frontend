<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="item.id"
        :class="index < 1 ? 'mb-12' : 'my-12'"
      >
        <div
          class="rounded-md border-4 border-brand-main-gray p-6 transition-colors duration-500"
          :class="
            isOpen(item.id) ? 'bg-brand-main-gray' : 'bg-white cursor-pointer'
          "
          @click="handleClick(item.id)"
        >
          <div class="flex justify-between my-4">
            <h4
              class="hidden lg:block flex-1 font-normal pr-8"
              :class="
                isOpen(item.id) ? 'text-brand-dark-blue' : 'text-brand-carbon'
              "
            >
              {{ item.title }}
            </h4>
            <h5
              class="lg:hidden flex-1 font-normal pr-8"
              :class="
                isOpen(item.id) ? 'text-brand-dark-blue' : 'text-brand-carbon'
              "
            >
              {{ item.title }}
            </h5>
            <span
              :class="isOpen(item.id) ? 'opacity-0' : 'opacity-100'"
              class="flex-none w-12 text-right transition-opacity duration-300 delay-700"
            >
              <icon name="plus" size="75" />
            </span>
          </div>
          <accordion-content
            v-show="isOpen(item.id)"
            :is-open="isOpen(item.id)"
          >
            <p>{{ item.body }}</p>
          </accordion-content>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AccordionContent from '@/components/AccordionContent';
export default {
  name: 'Accordions',
  components: { AccordionContent },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
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
