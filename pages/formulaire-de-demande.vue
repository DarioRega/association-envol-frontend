<template>
  <section>
    <small-container>
      <page-header :title="$t('pagesNames.formDemand')" />
    </small-container>
    <div>
      <small-container>
        <accordions :list="list" />
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
      list.sort((a, b) => a.slug.localeCompare(b.slug));
      return { list };
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
    };
  },
};
</script>
