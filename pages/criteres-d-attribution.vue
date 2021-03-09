<template>
  <section class="criterias">
    <container>
      <page-header :title="$t('pagesNames.attributionCriteria')" />
    </container>
    <container>
      <div v-for="item in criterias" :key="item.slug">
        <nuxt-content :document="item" class="outside-list" />
      </div>
    </container>
    <container>
      <h4>{{ $t('importantsRemarks') }}</h4>
    </container>
  </section>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import Container from '@/components/containers/Container';
export default {
  name: 'CriteresDAttribution',
  components: { Container, PageHeader },
  async asyncData({ $getContent, error }) {
    try {
      const criterias = await $getContent('attributionCriteria/criterias');
      const demands = await $getContent('attributionCriteria/formDemands');
      const remarksContent = await $getContent('attributionCriteria/remarks');
      return { criterias, demands, remarks: remarksContent.remarks };
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
      demands: [],
      remarks: [],
    };
  },
};
</script>
<style lang="scss">
.criterias {
  h4 {
    @apply text-brand-dark-blue font-medium;
  }
}
</style>
