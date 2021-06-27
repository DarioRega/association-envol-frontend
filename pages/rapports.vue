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
          class="
            flex flex-col
            md:flex-row
            flex-wrap
            justify-between
            md:justify-start
            w-full
          "
        >
          <li
            v-for="file in fileArray"
            :key="file.id"
            class="block my-4 md:pr-6 md:w-1/2 xl:w-1/3"
          >
            <a
              :href="formatSource(file)"
              :download="file.is_external === false"
              target="_blank"
              class="
                inline-flex
                items-start
                justify-between
                caption-lg
                hover:text-brand-dark-gray
              "
            >
              <span class="flex-none w-10">
                <icon
                  :name="file.is_external ? 'external-link' : 'document'"
                  size="75"
                  class="text-current"
                />
              </span>
              {{ file.name }}</a
            >
          </li>
        </ul>
      </div>
    </small-container>
  </section>
</template>

<script>
import { API_URL } from '@/constantes';
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
    this.$axios
      .get(API_URL.RAPPORTS_ONLY_WEBSITE_RELATED)
      .then((response) => {
        this.allFiles = response.data;
      })
      .catch((err) => err);
    // TODO handle that
  },
  methods: {
    formatSource(file) {
      if (!file.is_external) {
        return `${API_URL.RAPPORTS}/download/${file.id}`;
      }
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
