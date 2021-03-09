<template>
  <section>
    <hero />
    <h2 class="text-center font-semibold pb-8 lg:pb-16">
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
  </section>
</template>

<script>
import Hero from '@/components/Hero';
import Container from '@/components/containers/Container';
import ContentSwap from '@/components/ContentSwap';
import StatsEnvol from '@/components/StatsEnvol';
export default {
  name: 'Index',
  components: { StatsEnvol, Container, Hero, ContentSwap },
  async asyncData({ $getContent, error }) {
    try {
      const contentSwap = await $getContent('home/content-swap');
      return { contentSwap };
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
