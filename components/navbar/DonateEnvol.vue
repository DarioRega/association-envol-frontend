<template>
  <nuxt-link
    :to="$t('helpEnvol.slug')"
    class="button-primary btn font-semibold rounded-full"
    exact-active-class="font-bold"
    @click.native="$emit('closeMenu')"
  >
    {{ $t('pagesNames.helpEnvol') }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'DonateEnvol',
};
</script>
