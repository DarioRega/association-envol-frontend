<template>
  <div>
    <!-- LABEL TOP REQUIRED  -->
    <label :for="field.id" class="sr-only">{{ field.placeholder }}</label>
    <div
      class="flex items-center"
      :class="value ? 'justify-between' : 'justify-end'"
    >
      <p
        v-if="value"
        class="caption-lg block pb-2 text-right text-secondary font-medium"
        data-aos="fade-in"
        data-aos-easing="linear"
        data-aos-duration="500"
      >
        {{ field.placeholder }}
      </p>
      <span
        class="caption-sm block pb-2 text-right text-secondary"
        data-aos="fade-in"
        data-aos-easing="linear"
        data-aos-duration="800"
        data-aos-delay="1600"
        data-aos-anchor=".contact-form"
        data-aos-anchor-placement="top-bottom"
        >{{
          field.isOptional
            ? $t('formLabels.isOptional')
            : $t('formLabels.isRequired')
        }}</span
      >
    </div>
    <div class="relative rounded-md shadow-sm">
      <!-- CASE  TEXTAREA -->
      <div
        v-if="field.type === 'textarea'"
        data-aos="fade-up"
        data-aos-easing="ease-out"
        data-aos-duration="500"
        data-aos-anchor=".contact-form"
        data-aos-anchor-placement="top-bottom"
        :data-aos-delay="index * 300 + 100"
      >
        <textarea
          :id="field.id"
          v-model="value"
          :name="field.id"
          rows="5"
          :class="error && 'has-error'"
          class="form-input form-outline block w-full py-3 px-4 transition ease-in-out duration-150"
          :placeholder="field.placeholder"
        ></textarea>
      </div>

      <!-- CASE  SELECT  -->
      <div
        v-else-if="field.type === 'select'"
        data-aos="fade-up"
        data-aos-easing="ease-out"
        data-aos-duration="500"
        data-aos-anchor=".contact-form"
        data-aos-anchor-placement="top-bottom"
        :data-aos-delay="index * 300 + 100"
      >
        <select
          :id="field.id"
          v-model="field.options[0].value"
          :name="field.id"
          :class="error && 'has-error'"
          class="form-input form-outline block w-full py-3 px-4 transition ease-in-out duration-150"
          :placeholder="field.placeholder"
        >
          <option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.placeholder }}
          </option>
        </select>
      </div>

      <!--     CASE  FILE UPLOAD -->
      <div
        v-else-if="field.type === 'files'"
        data-aos="fade-up"
        data-aos-easing="ease-out"
        data-aos-duration="500"
        data-aos-anchor=".contact-form"
        data-aos-anchor-placement="top-bottom"
        :data-aos-delay="index * 300 + 100"
      >
        <file-uploader
          :id="field.id"
          :name="field.name"
          :class="error && 'has-error'"
          @filesChange="value = $event"
        />
      </div>

      <!-- CASE  INPUT TEXT -->
      <div
        v-else
        data-aos="fade-up"
        data-aos-easing="ease-out"
        data-aos-duration="500"
        data-aos-anchor=".contact-form"
        data-aos-anchor-placement="top-bottom"
        :data-aos-delay="index * 300 + 100"
      >
        <input
          :id="field.id"
          v-model.lazy="value"
          :name="field.id"
          class="form-input form-outline block w-full py-3 px-4 transition ease-in-out duration-150"
          :class="error && 'has-error'"
          :data-mask="field.id === 'birthdate' ? '00.00.0000' : ''"
          :placeholder="field.placeholder"
        />
      </div>

      <!-- ERROR INPUT  -->

      <div
        v-if="error"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <svg
          class="w-8 h-8 text-brand-error"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <p v-if="error" id="email-error" class="mt-3 caption-lg text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'InputForm',
  props: {
    field: {
      type: Object,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      value: '',
    };
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.$emit('valueChange', this.field.id, newValue);
      },
    },
  },
  mounted() {
    if (this.field.type === 'select') {
      this.value = this.field.options[0].value;
    }
  },
};
</script>
<style lang="scss">
label {
  @apply font-semibold;
}
</style>
