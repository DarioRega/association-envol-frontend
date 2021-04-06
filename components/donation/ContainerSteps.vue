<template>
  <section class="w-full bg-white rounded-md shadow-md">
    <div
      class="relative rounded-t-md bg-brand-dark-blue py-4 sm:py-6 md:py-8 flex items-center justify-center px-5 lg:px-12"
    >
      <h5 class="text-center text-white my-auto font-medium">
        Association Envol <span class="hidden md:inline">-</span
        ><span class="md:hidden"><br /></span> Formulaire de donation
      </h5>
      <div class="absolute right-0 ml-2 sm:mr-4 w-12">
        <a class="cursor-pointer text-white" @click="$emit('closeModal')"
          ><icon name="close" size="75"
        /></a>
      </div>
    </div>
    <div
      class="p-5 md:px-10 lg:px-16 2xl:px-20 form-container flex flex-col items-center justify-center"
    >
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
