<template>
  <div class="hero flex">
    <container>
      <div class="h-full w-full flex flex-col">
        <icon name="envol_home_landing" size="full" />
        <h1 class="text-brand-dark-blue font-medium uppercase mt-10">
          {{ $t('associationEnvol') }}
        </h1>
        <span class="w-40 h-2 mt-4 mb-10 bg-brand-dark-blue"></span>
        <p class="subtitle">
          {{ $t('home.subtitle') }}
        </p>
        <slot />
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
    min-height: 80vh;
  }
}
</style>
