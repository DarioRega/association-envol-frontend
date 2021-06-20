<template>
  <div>
    <div
      class="
        page-header
        mt-10
        md:mt-0
        flex
        items-center
        justify-start
        w-full
        text-left
      "
      :class="pageCategory"
    >
      <h1 class="font-medium">{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    pageCategory: {
      type: String,
      default: 'globals',
    },
  },
};
</script>
<style lang="scss">
.page-header.globals {
  @screen md {
    min-height: 12rem;
  }
  @screen lg {
    min-height: 20rem;
  }
  @screen 2xl {
    min-height: 25rem;
  }
}
</style>
