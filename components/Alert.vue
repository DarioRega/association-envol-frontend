<template>
  <div class="rounded-md bg-brand-main-gray sm:px-6 md:p-10 md:shadow-md">
    <div class="flex">
      <div class="flex-shrink-0 text-brand-dark-blue">
        <icon name="info" size="100" />
      </div>
      <div class="ml-6 flex-1 md:flex flex-col justify-start">
        <h6 class="font-medium mb-2 text-brand-dark-blue">
          Information {{ title }}
        </h6>
        <p>
          {{ text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
