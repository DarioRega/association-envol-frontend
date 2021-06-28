<template>
  <section>
    <small-container>
      <page-header :title="$t('pagesNames.formDemand')" />
    </small-container>
    <div>
      <small-container>
        <accordions :list="list" />
        <div class="mt-12 lg:mt-24 mb-8 lg:mb-16 got-questions">
          <nuxt-content class="" :document="gotQuestions" />
        </div>
      </small-container>
    </div>
  </section>
</template>

<script>
import SmallContainer from '@/components/containers/SmallContainer';
import PageHeader from '@/components/PageHeader';
import Accordions from '@/components/Accordions';
export default {
  name: 'FormulaireDeDemande',
  components: { Accordions, PageHeader, SmallContainer },
  async asyncData({ $getContent, error }) {
    try {
      const list = await $getContent('formDemands/accordions');
      const gotQuestions = await $getContent('formDemands/gotQuestions');
      list.sort((a, b) => a.slug.localeCompare(b.slug));
      return { list, gotQuestions };
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      });
    }
  },
  data() {
    return {
      list: [],
      gotQuestions: {},
    };
  },
  head() {
    return { title: `Demande de bourse - ${process.env.APP_NAME}` };
  },
};
</script>
<style lang="scss">
.got-questions {
  & h4 {
    @apply font-medium text-brand-dark-blue;
  }

  & a {
    @apply text-brand-dark-blue;
  }
}
</style>
