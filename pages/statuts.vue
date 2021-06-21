<template>
  <section>
    <small-container>
      <page-header :title="$t('pagesNames.status')" />
    </small-container>
    <small-container>
      <div v-for="item in sections" :key="item.slug" class="mb-16">
        <h3 class="font-bold tracking-wider lg:tracking-normal">
          {{ item.title }}
        </h3>
        <nuxt-content :document="item" class="status-documents" />
      </div>
    </small-container>
  </section>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import SmallContainer from '@/components/containers/SmallContainer';
export default {
  name: 'Status',
  components: { SmallContainer, PageHeader },
  async asyncData({ $getContent, error }) {
    try {
      const sections = await $getContent('statuts/sections');
      const officalSignature = await $getContent('statuts/signature');
      return { sections, officalSignature };
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      });
    }
  },
  data() {
    return {
      sections: [],
      officalSignature: {},
    };
  },
};
</script>
<style lang="scss">
.status-documents {
  h5 {
    @apply font-medium text-brand-dark-blue;
  }
}
</style>
