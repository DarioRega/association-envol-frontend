<template>
  <div class="flex flex-col min-h-screen">
    <navbar />
    <Nuxt class="flex-grow" />
  </div>
</template>
<script>
import Navbar from '~/components/navbar/Navbar';
export default {
  components: { Navbar },
};
</script>
