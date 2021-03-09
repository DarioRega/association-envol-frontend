<template>
  <div>
    <div
      class="page-header mt-10 flex items-center justify-start w-full text-left"
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
  },
};
</script>
<style lang="scss">
.page-header {
  //min-height: 12rem;
}
</style>
