<template>
  <article class="home-swap" :class="[body.side, body.slug]">
    <div
      class="flex flex-col lg:items-center overflow-hidden"
      :class="body.side === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'"
    >
      <div class="flex-none bg-white lg:w-2/5 2xl:w-5/12 3xl:w-1/2 py-6">
        <!--        mobile -->
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
        <!-- desktop -->
        <picture
          :srcset="require(`~/assets/svg/${body.fileName}.svg`)"
          :data-aos="body.side === 'right' ? 'zoom-in-right' : 'zoom-in-left'"
          data-aos-easing="ease-out"
          data-aos-duration="800"
          data-aos-delay="500"
          :class="[body.biggerWidth ? 'max-w-lg 2xl:max-w-lg' : 'max-w-md']"
          class="content-swap hidden lg:block w-full mx-auto"
          type="image/svg+xml"
        >
          <img
            :src="require(`~/assets/images/${body.fileName}.png`)"
            class="content-swap hidden lg:block w-full mx-auto"
            :class="[
              body.biggerWidth ? 'lg:max-w-lg 2xl:max-w-lg' : 'lg:max-w-md',
            ]"
          />
        </picture>
      </div>

      <div
        class="
          container-swap-item
          bg-brand-main-gray
          flex-1
          py-6
          lg:py-0
          flex flex-col
          justify-center
          lg:justify-around
        "
        :class="body.side === 'right' ? 'lg:rounded-l-3xl' : 'lg:rounded-r-3xl'"
      >
        <div
          class="
            mx-auto
            px-12
            sm:px-0 sm:w-9/12
            lg:px-0
            w-full
            md:w-10/12
            lg:w-9/12
            xl:w-8/1
          "
        >
          <div class="mt-4 text-secondary rich-text">
            <nuxt-content class="home-swap" :document="body" />
          </div>
        </div>
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
};
</script>

<style lang="scss">
.container-swap-item {
  @screen lg {
    min-height: 35rem;
  }
}
.home-swap {
  h3 {
    @apply text-brand-dark-blue font-medium text-left mb-8;
  }
  a {
    @apply text-brand-dark-blue;
  }
}
</style>
