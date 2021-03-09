<template>
  <section class="page-spacer">
    <hero />
    <h2 class="text-center font-semibold spacing-subtitle">
      {{ $t('home.envolIs') }}
    </h2>
    <div class="bg-brand-main-gray">
      <container>
        <div
          class="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:py-10"
        >
          <stats-envol
            v-for="stat in stats"
            :key="stat.number"
            :number="stat.number"
            :text="stat.text"
            class="my-10 md:my-10 lg:my-0"
          />
        </div>
      </container>
    </div>
    <section>
      <content-swap
        v-for="item in contentSwap"
        :key="item.slug"
        :body="item"
        class="py-12 md:py-16 2xl:py-24"
      />
    </section>
    <container :extra-spacing="true">
      <h2 class="text-center font-semibold spacing-subtitle">
        {{ $t('home.ourComitee') }}
      </h2>
      <comitee-grid :list="comitee" />
    </container>
  </section>
</template>

<script>
import Hero from '@/components/Hero';
import Container from '@/components/containers/Container';
import ContentSwap from '@/components/ContentSwap';
import StatsEnvol from '@/components/StatsEnvol';
import ComiteeGrid from '@/components/ComiteeGrid';

// TODO Scroll to on click icon, animation content swap, animation hero, animation comitee, animation trigger on numbers when only visisble stats
export default {
  name: 'Index',
  components: { ComiteeGrid, StatsEnvol, Container, Hero, ContentSwap },
  async asyncData({ $getContent, error }) {
    try {
      const contentSwap = await $getContent('home/content-swap');
      const comiteeData = await $getContent('home/comitee');
      return { contentSwap, comitee: comiteeData.comitee };
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      });
    }
  },
  data() {
    return {
      stats: [],
      contentSwap: [],
      comitee: [],
    };
  },
  mounted() {
    this.stats = [
      {
        number: 1997,
        text: this.$t('home.since'),
      },
      {
        number: 1245,
        text: this.$t('home.boursesAttribuees'),
      },
      {
        number: 216,
        text: this.$t('home.donators'),
      },
    ];
  },
};
</script>
