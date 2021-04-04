<template>
  <section>
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="md:pr-3 w-full md:w-1/2">
        <input
          type="text"
          :value="dataCustomer.first_name"
          :class="handleStyleReactivity('first_name')"
          class="border-2 rounded-md outline-none focus:outline-none placeholder-brand-carbon p-2 transition-colors duration-500 w-full"
          placeholder="Prénom"
          @change="$emit('onInputChange', $event, 'first_name')"
        />
      </div>
      <div class="mt-6 md:mt-0 md:pl-3 w-full md:w-1/2">
        <input
          type="text"
          :value="dataCustomer.last_name"
          :class="handleStyleReactivity('last_name')"
          class="border-2 rounded-md outline-none focus:outline-none placeholder-brand-carbon p-2 transition-colors duration-500 w-full"
          placeholder="Nom de famille"
          @change="$emit('onInputChange', $event, 'last_name')"
        />
      </div>
    </div>
    <div class="mt-6">
      <div class="relative flex items-center">
        <div class="flex items-center h-5">
          <input
            :value="isDonationFromCompany"
            :checked="isDonationFromCompany"
            type="checkbox"
            class="cursor-pointer h-4 w-4 border-brand-variant-main-gray rounded-md"
            @click="$emit('onDonationFromCompany', !isDonationFromCompany)"
          />
        </div>
        <div class="ml-3 text-sm">
          <label
            class="text-md font-medium text-brand-carbon cursor-pointer"
            @click="$emit('onDonationFromCompany', !isDonationFromCompany)"
            >Ce don est pour le compte d'une entreprise</label
          >
        </div>
      </div>
      <transition-expand>
        <div v-show="isDonationFromCompany">
          <div class="mt-5">
            <input
              type="text"
              :value="dataCustomer.company_name"
              :class="handleStyleReactivity('company_name')"
              class="w-full border-2 rounded-md outline-none focus:outline-none border-2 placeholder-brand-carbon p-2 transition-colors duration-500"
              placeholder="Société donatrice"
              @change="$emit('onCompanyName', $event.target.value)"
            />
          </div>
        </div>
      </transition-expand>
    </div>

    <div class="mt-6">
      <input
        type="text"
        :value="dataCustomer.email"
        :class="handleStyleReactivity('email')"
        class="w-full border-2 rounded-md outline-none focus:outline-none placeholder-brand-carbon p-2 transition-colors duration-500"
        placeholder="Email"
        @change="$emit('onInputChange', $event, 'email')"
      />
    </div>

    <div class="mt-6"></div>
    <div class="relative flex items-start mt-8">
      <div class="flex items-center h-5">
        <input
          :value="dataCustomer.agreedPCI"
          :checked="dataCustomer.agreedPCI"
          type="checkbox"
          class="cursor-pointer h-4 w-4 rounded-md"
          @click="$emit('onPCIChange', !dataCustomer.agreedPCI)"
        />
      </div>
      <div class="ml-3 text-sm">
        <label
          :class="handleStyleReactivity('agreedPCI')"
          class="text-md font-medium cursor-pointer"
          @click="$emit('onPCIChange', !dataCustomer.agreedPCI)"
          >En faisant un don avec ce formulaire, vous acceptez notre
          <a
            class="text-brand-dark-blue font-semibold"
            href="https://association-envol.info/politique-de-confidentialite"
            target="_blank"
            >politique de confidentialité</a
          >.</label
        >
      </div>
    </div>
  </section>
</template>

<script>
import TransitionExpand from '@/components/TransitionExpand';
export default {
  name: 'StepCustomerInfo',
  components: { TransitionExpand },
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
    dataCustomer: {
      type: Object,
      required: true,
    },
    isDonationFromCompany: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    agreedPCI(newValue, oldValue) {
      this.$emit('onPCIChange', newValue);
    },
  },
  methods: {
    handleStyleReactivity(field) {
      const hasError = this.errors.find((x) => x.field === field);
      if (hasError) {
        if (hasError.field === 'agreedPCI') {
          return 'text-brand-error';
        }
        return 'border-brand-error';
      }
      if (field === 'agreedPCI') {
        return 'text-brand-carbon';
      }
      return 'border-brand-variant-main-gray placeholder-brand-carbon';
    },
  },
};
</script>

<style scoped></style>
