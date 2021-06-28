<template>
  <section class="page-spacer">
    <small-container>
      <page-header :title="$t('pagesNames.attributionCriteria')" />
    </small-container>
    <small-container>
      <nuxt-content
        :document="policy"
        class="outside-list privacy-policy -mt10 lg:-mt-20"
      />
    </small-container>
    <small-container>
      <div class="text-right">
        <p>Lausanne, le 28.06.2020</p>
      </div>
    </small-container>
  </section>
</template>

<script>
import SmallContainer from '@/components/containers/SmallContainer';
import PageHeader from '@/components/PageHeader';
export default {
  name: 'PolitiqueDeConfidentialite',
  components: { PageHeader, SmallContainer },
  async asyncData({ $getContent, error }) {
    try {
      const policy = await $getContent('cpdr/index');
      return { policy };
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      });
    }
  },
  data() {
    return {
      policy: {},
    };
  },
  head() {
    return { title: `Politique de confidentialité - ${process.env.APP_NAME}` };
  },
};
</script>
<style lang="scss">
.privacy-policy {
  & h4 {
    @apply font-semibold mt-10;
    @screen lg {
      @apply font-bold mt-20;
    }
  }
  & h5 {
    @apply font-medium text-brand-dark-blue mt-4;
    @screen lg {
      @apply font-semibold;
    }
  }
  p {
    @apply font-medium;
  }
}
</style>
