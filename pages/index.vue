<template>
  <section class="page-spacer">
    <hero class="w-full" />
    <div class="relative">
      <span id="envol-is" class="absolute"></span>
    </div>
    <h2 class="text-center font-semibold spacing-subtitle">
      {{ $t('home.envolIs') }}
    </h2>
    <div class="bg-brand-main-gray md:mb-16 2xl:mb-24">
      <container>
        <div
          class="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:py-10"
        >
          <stats-envol
            v-for="stat in stats"
            :key="stat.number"
            :should-animate="isAnimationDone"
            :number="stat.number"
            :text="stat.text"
            class="my-10 md:my-10 w-full lg:my-0 w-1/3"
          />
        </div>
        <div
          v-waypoint="{
            active: true,
            callback: onWaypoint,
            options: intersectionOptions,
          }"
        ></div>
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
        {{ $t('home.ourCommittee') }}
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

export default {
  name: 'Index',
  components: { ComiteeGrid, StatsEnvol, Container, Hero, ContentSwap },
  async asyncData({ $getContent, error }) {
    try {
      const contentSwap = await $getContent('home/content-swap');
      contentSwap.sort((a, b) => a.slug.localeCompare(b.slug));
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
      isAnimationDone: false,
      comitee: [],
      intersectionOptions: {
        root: null,
        rootMargin: '150px 0px 0px 0px',
        threshold: [1, 0], // [0.25, 0.75] if you want a 25% offset!
      },
    };
  },
  mounted() {
    this.stats = [
      {
        number: 1997,
        text: this.$t('home.creation'),
      },
      {
        number: 1272,
        text: this.$t('home.boursesAttribuees'),
      },
      {
        number: 208,
        text: this.$t('home.donators'),
      },
    ];
  },
  methods: {
    onWaypoint({ going }) {
      if (going === this.$waypointMap.GOING_IN) {
        if (!this.isAnimationDone) {
          this.isAnimationDone = true;
        }
      }
    },
  },
  head() {
    return { title: `Accueil - ${process.env.APP_NAME}` };
  },
};
</script>
<style lang="scss">
#envol-is {
  top: -3rem;
  @screen md {
    top: -4rem;
  }
  @screen lg {
    top: -5rem;
  }
}
</style>
