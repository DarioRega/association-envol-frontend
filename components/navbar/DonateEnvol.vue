<template>
  <nuxt-link
    :to="$t('helpEnvol.slug')"
    class="button-primary btn font-medium rounded-full"
    exact-active-class="font-semibold"
  >
    {{ $t('pagesNames.helpEnvol') }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'DonateEnvol',
};
</script>
