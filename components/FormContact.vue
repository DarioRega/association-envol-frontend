<template>
  <section>
    <form
      :key="formKey"
      class="grid grid-cols-1 gap-y-6 md:gap-y-6"
      @submit.prevent="handleSubmit"
    >
      <input-form
        v-for="(field, index) in fields"
        :key="field.id"
        :field="field"
        :error="hasError(field.id)"
        :index="index"
        @valueChange="valueChange"
      />
      <div class="mt-4">
        <span
          class="inline-flex rounded-md lg:hidden"
          data-aos="fade-right"
          data-aos-easing="ease-in-out"
          data-aos-duration="500"
          data-aos-delay="1300"
          data-aos-offset="-500"
        >
          <button class="button-primary focus:outline-none" type="submit">
            {{ $t('send') }}
          </button>
        </span>
        <span
          class="inline-flex rounded-md hidden lg:block"
          data-aos="fade-left"
          data-aos-easing="ease-in-out"
          data-aos-duration="500"
          data-aos-delay="1300"
          data-aos-offset="-500"
        >
          <button
            class="button-primary focus:outline-none"
            type="submit"
            :is-loading="isLoading"
          >
            {{ isLoading ? $t('sendInProgress') : $t('send') }}
          </button>
        </span>
      </div>
    </form>
  </section>
</template>

<script>
import InputForm from '@/components/InputForm';

export default {
  name: 'FormContact',
  components: { InputForm },
  data() {
    return {
      formKey: 1,
      formValues: {},
      fields: [],
      errors: {},
      optionalFields: [''],
      isLoading: false,
      shouldShowNotification: false,
      notification: {
        type: '',
        message: '',
      },
    };
  },
  watch: {
    shouldShowNotification(newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {
          if (this.shouldShowNotification) {
            this.shouldShowNotification = false;
          }
        }, 5000);
      }
    },
  },
  mounted() {
    const fields = this.$getFormsLabels();
    fields.forEach((field) => {
      if (field) {
        this.formValues[field.id] = '';
        if (field.isOptional) {
          this.optionalFields.push(field.id);
        }
      }
    });
    this.fields = fields;
  },
  methods: {
    valueChange(propertyName, value) {
      this.formValues[propertyName] = value;
    },
    handleSubmit() {
      if (!this.validateFormValues()) {
        return;
      }
      console.log('VALUES VALIDS', this.formValues);
      this.isLoading = true;
      // this.$axios
      //   .post('/contact', this.formValues)
      //   .then((res) => this.handleSuccess())
      //   .catch(() =>
      //     this.handleError(
      //       'Un problème est survenu, veuillez nous contacter directement via notre email en bas de page. Merci'
      //     )
      //   )
      //   .finally(() => (this.isLoading = false));
    },
    handleSuccess() {
      this.formValues = {};
      this.formKey = Math.floor(Math.random() * Math.floor(9999));
      this.shouldShowNotification = true;
      // TODO HANDLE SUCCESS
      this.notification = {
        type: 'success',
        message:
          'Merci pour votre envoi, nous reviendrons vers vous dès que possible.',
      };
    },
    handleError(errMessage) {
      // TODO HANDLE ERROR
      this.shouldShowNotification = true;
      this.notification = {
        type: 'error',
        message: errMessage,
      };
    },
    hasError(fieldId) {
      const error = this.errors[fieldId];
      if (error) return error;
      return '';
    },
    validateFormValues() {
      this.errors = {};
      const values = this.formValues;
      let errors = {};

      Object.keys(values).forEach((propertyName) => {
        const error = this.$validateValue(
          propertyName,
          values[propertyName],
          this.optionalFields.includes(propertyName)
        );
        if (error) {
          errors = { ...errors, [propertyName]: error };
        }
      });
      if (Object.keys(errors).length > 0 && errors.constructor === Object) {
        this.errors = errors;
        return false;
      }
      return true;
    },
  },
};
</script>