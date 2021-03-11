<template>
  <section>
    <small-container>
      <page-header :title="$t('pagesNames.rapports')" />
    </small-container>
    <small-container>
      <div
        v-for="(fileArray, index) in allFiles"
        :key="index"
        :class="index > 0 ? 'my-12 xl:my-20' : 'mb-12 xl:mb-20'"
      >
        <h3 class="text-brand-dark-blue font-medium mb-6">
          {{ getTypeName(fileArray) }}
        </h3>
        <ul
          class="flex flex-col md:flex-row flex-wrap justify-between md:justify-start w-full"
        >
          <li
            v-for="file in fileArray"
            :key="file.id"
            class="block my-4 w-1/2 xl:w-1/3"
          >
            <a
              :href="formatSource(file)"
              :download="file.is_external === false"
              target="_blank"
              class="inline-flex items-center justify-between caption-lg hover:text-brand-dark-gray"
            >
              <icon
                :name="file.is_external ? 'external-link' : 'document'"
                size="75"
                class="text-current mr-3"
              />
              {{ file.name }}</a
            >
          </li>
        </ul>
      </div>
    </small-container>
  </section>
</template>

<script>
import SmallContainer from '~/components/containers/SmallContainer';
import PageHeader from '~/components/PageHeader';
export default {
  name: 'Rapports',
  components: { PageHeader, SmallContainer },
  data() {
    return {
      allFiles: [],
    };
  },
  mounted() {
    // TODO SET BASE URL FOR API
    const baseUrlApi = 'http://localhost:8000/api';
    this.$axios
      .get(`${baseUrlApi}/rapports`)
      .then((response) => {
        console.log('response', response.data);
        this.allFiles = response.data;
      })
      .catch((err) => console.log('err', err));
  },
  methods: {
    formatSource(file) {
      if (!file.is_external) return `http//localhost:80${file.srcUrl}`;
      return file.srcUrl;
    },
    getTypeName(fileArray) {
      if (fileArray.length) {
        if (fileArray[0].type) {
          return fileArray[0].type.name;
        }
      }
      return '';
    },
  },
};
</script>
