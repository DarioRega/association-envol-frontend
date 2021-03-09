<template>
  <div class="hero flex items-center relative">
    <container class="-mt-32">
      <div class="h-full w-full flex flex-col xl:flex-row-reverse">
        <div class="birds-container w-full md:h-64 md:w-4/5 xl:w-full mx-auto">
          <icon name="envol_home_landing" size="full" />
        </div>
        <div>
          <h1 class="text-brand-dark-blue font-medium uppercase mt-10">
            {{ $t('associationEnvol') }}
          </h1>
          <span class="block w-40 h-2 mt-4 mb-10 bg-brand-dark-blue"></span>
          <h5 class="lg:w-10/12 xl:w-full xl:pr-6 font-light">
            {{ $t('home.subtitle') }}
          </h5>
          <div class="text-center xl:hidden mt-48 md:mt-64 md:pt-64 pb-6">
            <icon name="scroll-down-arrow" size="150" />
          </div>
        </div>
      </div>
      <div
        class="arrow-down text-center hidden xl:block absolute left-0 right-0"
      >
        <icon name="scroll-down-arrow" size="150" />
      </div>
    </container>
  </div>
</template>
<script>
import Container from '@/components/containers/Container';
export default {
  components: { Container },
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
