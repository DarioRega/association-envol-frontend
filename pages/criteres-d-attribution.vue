<template>
  <section class="criterias page-spacer">
    <small-container>
      <page-header :title="$t('pagesNames.attributionCriteria')" />
    </small-container>
    <small-container>
      <div
        v-for="(item, index) in criterias"
        :key="item.slug"
        :class="index < criterias.length - 1 && 'mb-16 lg:mb-20'"
      >
        <h3>{{ item.title }}</h3>
        <nuxt-content :document="item" class="outside-list" />
      </div>
    </small-container>
    <small-container>
      <h3 class="spacing-subtitle">{{ $t('importantsRemarks') }}</h3>
      <accordions :list="remarks" />
    </small-container>
  </section>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import Accordions from '@/components/Accordions';
import SmallContainer from '@/components/containers/SmallContainer';

export default {
  name: 'CriteresDAttribution',
  components: { SmallContainer, Accordions, PageHeader },
  async asyncData({ $getContent, error }) {
    try {
      const criterias = await $getContent('attributionCriteria/criterias');
      const remarksContent = await $getContent('attributionCriteria/remarks');
      return { criterias, remarks: remarksContent.remarks };
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      });
    }
  },
  data() {
    return {
      criterias: [],
      remarks: [],
    };
  },
  head() {
    return { title: `Critères d'attribution - ${process.env.APP_NAME}` };
  },
};
</script>
<style lang="scss">
.criterias {
  h3 {
    @apply text-brand-dark-blue font-medium;
  }
  & a {
    @apply text-brand-dark-blue;
  }
}
</style>
