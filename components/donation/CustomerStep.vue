<template>
  <section>
    <ul v-show="errors.length > 0" class="mb-16">
      <li
        v-for="error in errors"
        :key="error"
        class="list-disc mb-2 text-brand-error caption-lg font-semibold tracking-wide"
      >
        {{ error }}
      </li>
    </ul>
    <h5 class="font-medium text-brand-dark-blue mb-20">
      Informations personnelles
    </h5>

    <div class="flex flex-col lg:flex-row lg:justify-between items-center">
      <div class="single-input-container lg:mr-8">
        <label for="full_name" class="sr-only">Nom et prénom</label>
        <div
          class="flex items-center absolute w-full"
          :style="{ top: '-2rem' }"
          :class="full_name ? 'justify-between' : 'justify-end'"
        >
          <p
            v-if="full_name"
            class="caption-sm block pb-2 text-right text-secondary"
            data-aos="fade-in"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            Nom et prénom
          </p>
        </div>
        <div class="relative">
          <input
            id="full_name"
            type="text"
            :value="full_name"
            class="p w-full border-2 rounded-md outline-none focus:outline-none border-2 placeholder-brand-carbon p-2 transition-colors duration-500 px-4 h-20"
            placeholder="Nom et prénom"
            @change="$emit('onFullName', $event.target.value)"
          />
        </div>
      </div>

      <div class="single-input-container lg:ml-8">
        <label for="email" class="sr-only">Email</label>
        <div
          class="flex items-center absolute w-full"
          :style="{ top: '-2rem' }"
          :class="email ? 'justify-between' : 'justify-end'"
        >
          <p
            v-if="email"
            class="caption-sm block pb-2 text-right text-secondary"
            data-aos="fade-in"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            Email
          </p>
        </div>
        <div class="relative">
          <input
            id="email"
            type="text"
            :value="email"
            class="p w-full border-2 rounded-md outline-none focus:outline-none border-2 placeholder-brand-carbon p-2 transition-colors duration-500 px-4 h-20"
            placeholder="Email"
            @change="$emit('onEmail', $event.target.value)"
          />
        </div>
      </div>
    </div>

    <div class="mt-10 md:mt-16">
      <div class="relative flex items-center">
        <div class="flex items-center h-5">
          <input
            :value="isDonationFromCompany"
            :checked="isDonationFromCompany"
            type="checkbox"
            class="cursor-pointer h-6 w-6 border-brand-variant-main-gray rounded-md"
            @click="$emit('onDonationFromCompany', !isDonationFromCompany)"
          />
        </div>
        <div class="ml-3">
          <label
            class="caption-lg font-medium text-brand-carbon cursor-pointer"
            @click="$emit('onDonationFromCompany', !isDonationFromCompany)"
            >Ce don est pour le compte d'une entreprise</label
          >
        </div>
      </div>
      <transition-expand>
        <div v-show="isDonationFromCompany">
          <div class="single-input-container full-size">
            <label for="company_name" class="sr-only">Société donatrice</label>
            <div
              class="flex items-center absolute w-full"
              :style="{ top: '-2rem' }"
              :class="company_name ? 'justify-between' : 'justify-end'"
            >
              <p
                v-if="company_name"
                class="caption-sm block pb-2 text-right text-secondary"
                data-aos="fade-in"
                data-aos-easing="linear"
                data-aos-duration="500"
              >
                Société donatrice
              </p>
            </div>
            <input
              id="company_name"
              type="text"
              :value="company_name"
              class="p w-full border-2 rounded-md outline-none focus:outline-none border-2 placeholder-brand-carbon p-2 transition-colors duration-500 px-4 h-20"
              placeholder="Société donatrice"
              @change="$emit('onCompanyName', $event.target.value)"
            />
          </div>
        </div>
      </transition-expand>
    </div>

    <div class="mt-10 md:mt-16">
      <div class="relative flex items-center">
        <div class="flex items-center h-6">
          <input
            :value="hasCommentary"
            :checked="hasCommentary"
            type="checkbox"
            class="cursor-pointer h-6 w-6 border-brand-variant-main-gray rounded-md"
            @click="$emit('onHasCommentary', !hasCommentary)"
          />
        </div>
        <div class="ml-3">
          <label
            class="caption-lg font-medium text-brand-carbon cursor-pointer"
            @click="$emit('onHasCommentary', !hasCommentary)"
            >Laisser un commentaire</label
          >
        </div>
      </div>
      <transition-expand>
        <div v-show="hasCommentary">
          <div class="single-input-container full-size">
            <label for="company_name" class="sr-only">Commentaire</label>
            <div
              class="flex items-center absolute w-full"
              :style="{ top: '-2rem' }"
              :class="commentary ? 'justify-between' : 'justify-end'"
            >
              <p
                v-if="commentary"
                class="caption-sm block pb-2 text-right text-secondary"
                data-aos="fade-in"
                data-aos-easing="linear"
                data-aos-duration="500"
              >
                Commentaire
              </p>
            </div>
            <textarea
              rows="4"
              :value="commentary"
              class="shadow-sm focus:outline-none p-3 block w-full p sm: border-brand-variant-main-gray border-2 rounded-md"
              placeholder="Votre commentaire"
              @change="$emit('onCommentary', $event.target.value)"
            ></textarea>
          </div>
        </div>
      </transition-expand>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CustomerStep',
  props: {
    commentary: {
      type: String,
      default: '',
    },
    company_name: {
      type: String,
      default: '',
    },
    full_name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    hasCommentary: {
      type: Boolean,
      default: false,
    },
    isDonationFromCompany: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
.single-input-container {
  @apply w-full relative;
  &:not(:first-child) {
    @apply mt-16;
  }
  @screen lg {
    &:not(.full-size) {
      @apply w-1/2;
    }
  }
  @screen 2xl {
    &:nth-child(n + 3) {
      @apply mt-12;
    }
    &:nth-child(2) {
      @apply mt-0;
    }
  }
}
</style>
