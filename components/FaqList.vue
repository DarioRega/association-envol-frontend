<template>
  <div class="faq">
    <ul v-if="list.length > 0">
      <li
        v-for="(item, index) in list"
        :key="item.id"
        :class="index < 1 ? 'mb-12' : 'my-12'"
      >
        <div class="border-b border-brand-main-gray pb-6">
          <div class="bg-white">
            <div
              class="flex justify-between cursor-pointer select-none"
              @click="handleClick(item.id)"
            >
              <h5
                class="faq-title flex-1 pr-8"
                :class="isOpen(item.id) && 'text-brand-dark-blue'"
              >
                {{ item.title }}
              </h5>
              <span
                class="
                  lg:hidden
                  flex-none
                  w-12
                  text-right
                  transform
                  transition-all
                  duration-500
                "
                :class="isOpen(item.id) ? 'rotate-45' : 'rotate-0'"
              >
                <icon
                  name="add"
                  size="75"
                  :class="
                    isOpen(item.id)
                      ? 'text-brand-middle-gray'
                      : 'text-brand-dark-blue'
                  "
                />
              </span>
              <span
                class="
                  hidden
                  lg:block
                  flex-none
                  w-12
                  text-right
                  transform
                  transition-all
                  duration-500
                "
                :class="isOpen(item.id) ? 'rotate-45' : 'rotate-0'"
              >
                <icon
                  name="add"
                  size="100"
                  :class="
                    isOpen(item.id)
                      ? 'text-brand-middle-gray'
                      : 'text-brand-dark-blue'
                  "
                />
              </span>
            </div>
            <faq-content
              v-show="isOpen(item.id)"
              class="faq-content"
              :is-open="isOpen(item.id)"
            >
              <nuxt-content :document="item" class="faq-content" />
            </faq-content>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FaqList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentOpenAccordion: [],
    };
  },
  methods: {
    handleClick(id) {
      if (this.currentOpenAccordion.includes(id)) {
        this.currentOpenAccordion = this.currentOpenAccordion.filter(
          (uid) => uid !== id
        );
      } else {
        this.currentOpenAccordion.push(id);
      }
    },
    isOpen(id) {
      return this.currentOpenAccordion.includes(id);
    },
  },
};
</script>
<style lang="scss">
.faq-title {
  line-height: 1.7em;
}
.faq-content {
  a {
    @apply text-brand-dark-blue;
  }
}
</style>
