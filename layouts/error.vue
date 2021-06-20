<template>
  <div class="h-full flex items-center">
    <container v-if="error.statusCode === 404">
      <div class="text-center error-404 -mt-24 lg:-mt-32">
        <h2 class="">404</h2>
        <div>
          <h5>Page non trouvée</h5>
          <p class="my-8">
            {{ $t('404.addressNotFound') }}
          </p>
          <nuxt-link
            to="/"
            class="
              font-medium
              h4
              text-brand-dark-blue
              hover:text-brand-carbon hover-link
            "
            >{{ $t('backToHome') }}</nuxt-link
          >
        </div>
      </div>
    </container>
  </div>
</template>

<script>
import Container from '@/components/containers/Container';
export default {
  name: 'Error',
  components: { Container },
  layout: 'error',
  props: ['error'],
};
</script>
<style lang="scss" scoped>
.error-404 {
  h2 {
    font-size: 10rem;
    @apply font-body font-bold;
  }
  h5 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1.8rem;
    @apply font-medium;
  }

  @screen lg {
    h2 {
      font-size: 25rem;
      @apply font-body font-bold;
    }
    h5 {
      font-size: 4rem;
    }
    p {
      font-size: 2rem;
      @apply font-medium;
    }
  }
}
</style>
