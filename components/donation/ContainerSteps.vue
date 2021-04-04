<template>
  <section class="w-full bg-white rounded-md shadow-md">
    <div
      class="rounded-t-md bg-brand-dark-blue h-20 md:h-16 lg:h-24 flex items-center justify-center px-5 lg:px-12"
    >
      <h5 class="text-center text-white my-auto font-medium">
        Association Envol <span class="hidden md:inline">-</span
        ><span class="md:hidden"><br /></span> Formulaire de donation
      </h5>
    </div>
    <div class="p-5 form-container flex flex-col items-center justify-center">
      <slot name="form" />
    </div>
    <slot name="stepper" />
  </section>
</template>

<script>
export default {
  name: 'ContainerSteps',
};
</script>
<style>
@screen md {
  .form-container,
  .feedback {
    min-height: 25rem;
  }
}
</style>
