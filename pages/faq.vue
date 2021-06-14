<template>
  <section class="page-spacer">
    <small-container>
      <page-header :title="$t('pagesNames.faq')" />
    </small-container>
    <small-container>
      <div v-for="(section, index) in questionsSection" :key="index">
        <div :class="index > 0 ? 'my-24' : 'mb-24'">
          <h4 class="flex-1 font-semibold text-brand-dark-blue mb-12 xl:mb-16">
            {{ section[0].parent }}
          </h4>
          <faq-list :list="section" />
        </div>
      </div>
    </small-container>
  </section>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FaqList from '@/components/FaqList';
import SmallContainer from '@/components/containers/SmallContainer';
export default {
  name: 'Faq',
  components: { SmallContainer, PageHeader, FaqList },
  async asyncData({ $getContent, error }) {
    try {
      const demandeBourse = await $getContent('faq/questions/a_demandeBourse');
      const budget = await $getContent('faq/questions/b_budget');
      const criterias = await $getContent('faq/questions/c_criterias');
      const entretien = await $getContent('faq/questions/d_entretien');
      const renouvellement = await $getContent(
        'faq/questions/e_renouvellement'
      );
      return { demandeBourse, budget, criterias, entretien, renouvellement };
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      });
    }
  },
  data() {
    return {
      questionsSection: [],
      demandeBourse: [],
      budget: [],
      criterias: [],
      entretien: [],
      renouvellement: [],
    };
  },
  mounted() {
    this.questionsSection = [
      this.demandeBourse,
      this.budget,
      this.criterias,
      this.entretien,
      this.entretien,
    ];
  },
};
</script>
