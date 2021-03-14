<template>
  <div class="flex flex-col min-h-screen">
    <container>
      <div class="flex justify-end pt-12">
        <nuxt-link
          to="/"
          class="rounded-full text-4xl font-normal tracking-wider text-white bg-brand-dark-blue px-10 py-3 font-heading hover:bg-white hover:text-brand-dark-blue border-2 border-brand-dark-blue transition-colors duration-300"
          >{{ $t('helpEnvol.backToHome') }}</nuxt-link
        >
      </div>
    </container>
    <Nuxt class="flex-grow" />
  </div>
</template>
<script>
import Container from '@/components/containers/Container';
export default {
  components: { Container },
};
</script>
