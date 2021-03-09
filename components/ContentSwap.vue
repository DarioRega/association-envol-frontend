<template>
  <article class="home-swap">
    <div
      class="flex flex-col lg:items-center overflow-hidden card-swap"
      :class="body.side === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'"
    >
      <div class="flex-shrink-0 bg-white lg:w-2/4 py-6">
        <container class="lg:hidden">
          <picture
            :srcset="require(`~/assets/svg/${body.fileName}.svg`)"
            type="image/svg+xml"
            class="content-swap w-full mx-auto"
            :class="body.biggerWidth ? 'max-w-sm' : 'max-w-xs'"
          >
            <img
              :src="require(`~/assets/images/${body.fileName}.png`)"
              class="w-full w-full mx-auto"
              :class="body.biggerWidth ? 'max-w-sm' : 'max-w-xs'"
            />
          </picture>
        </container>
        <picture
          :srcset="require(`~/assets/svg/${body.fileName}.svg`)"
          :data-aos="body.side === 'right' ? 'zoom-in-right' : 'zoom-in-left'"
          data-aos-easing="ease-out"
          data-aos-duration="800"
          data-aos-delay="500"
          :class="[
            body.side === 'right' ? 'lg:mr-auto lg:ml-0' : 'lg:ml-auto lg:mr-0',
            body.biggerWidth ? 'max-w-sm' : 'max-w-xs',
          ]"
          class="content-swap hidden lg:block w-full object-cover md:w-4/5 md:max-w-sm xl:max-w-lg h-64 md:h-auto lg:h-auto mx-auto"
          type="image/svg+xml"
        >
          <img
            :src="require(`~/assets/images/${body.fileName}.png`)"
            class="w-full object-cover xl:max-w-lg h-64 md:h-auto lg:h-auto mx-auto"
            :class="body.biggerWidth ? 'max-w-sm' : 'max-w-xs'"
          />
        </picture>
      </div>
      <div
        class="content-swap bg-brand-main-gray flex-1 md:flex-none lg:w-2/4 py-6 flex flex-col justify-between"
      >
        <container>
          <div class="flex-1">
            <!--          <h3 class="mt-1 font-semibold text-primary">{{ // title }}</h3>-->
            <div class="mt-4 text-secondary rich-text">
              <nuxt-content class="home-swap" :document="body" />
            </div>
          </div>
        </container>
      </div>
    </div>
  </article>
</template>

<script>
import Container from '@/components/containers/Container';
export default {
  name: 'ContentSwap',
  components: { Container },
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log('THIS BODY', this.body);
  },
};
</script>

<style lang="scss">
.card-swap {
  @screen md {
    @apply bg-transparent border-0;
  }
  @screen lg {
    @apply bg-brand-main-gray;
  }
}
.home-swap {
  h3 {
    @apply text-brand-dark-blue font-medium text-left mb-8;
  }
}
</style>
