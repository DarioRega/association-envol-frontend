<template>
  <div class="hero flex items-center relative">
    <container class="-mt-32">
      <div class="h-full w-full flex flex-col xl:flex-row-reverse">
        <div
          class="birds-container w-full md:h-64 md:w-4/5 xl:w-full mx-auto"
          data-aos="fade-right"
          data-aos-easing="ease-in"
          data-aos-duration="700"
          data-aos-delay="800"
          data-custom-fade="birds"
        >
          <icon name="envol_home_landing" size="full" />
        </div>
        <div>
          <h1
            class="text-brand-dark-blue font-medium uppercase mt-10"
            data-aos="zoom-in"
            data-aos-easing="ease-in"
            data-aos-duration="700"
          >
            {{ $t('associationEnvol') }}
          </h1>
          <span
            class="block w-40 h-2 mt-4 mb-10 bg-brand-dark-blue"
            data-aos="fade-right"
            data-aos-easing="ease-in"
            data-aos-duration="700"
          ></span>
          <h5
            class="lg:w-10/12 xl:w-full xl:pr-6 font-light"
            data-aos="fade-up"
            data-aos-easing="ease-in"
            data-aos-duration="500"
            data-aos-delay="300"
          >
            {{ $t('home.subtitle') }}
          </h5>
          <div class="text-center xl:hidden mt-48 md:mt-64 md:pt-64 pb-6">
            <span class="block" @click="scrollToEnvol">
              <icon name="scroll-down-arrow" size="150" />
            </span>
          </div>
        </div>
      </div>
      <div
        class="arrow-down text-center hidden xl:block absolute left-0 right-0"
      >
        <span class="block" @click="scrollToEnvol">
          <icon name="scroll-down-arrow" size="150" />
        </span>
      </div>
    </container>
  </div>
</template>
<script>
import Container from '@/components/containers/Container';
export default {
  components: { Container },
  methods: {
    scrollToEnvol() {
      document
        .getElementById('envol-is')
        .scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>
<style lang="scss">
.hero {
  min-height: calc(100vh - 6rem);
  @screen lg {
    min-height: calc(100vh - 8rem);
  }
}
.birds-container {
  @screen lg {
    height: 25rem;
  }
}
.arrow-down {
  @screen xl {
    bottom: 8rem;
  }
}
</style>
<style lang="scss">
[data-custom-fade='birds'] {
  transform: translate3d(-1600px, 0, 0);
}
</style>
