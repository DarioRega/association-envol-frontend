<template>
  <section>
    <ul v-show="errors.length > 0" class="mb-10 mt-6 list-inside">
      <li
        v-for="error in errors"
        :key="error"
        class="
          list-disc
          mb-2
          text-brand-error
          caption-lg
          font-semibold
          tracking-wide
        "
      >
        {{ error }}
      </li>
    </ul>
    <h5 class="font-medium text-brand-dark-blue mb-20 lg:mt-6">
      {{ $t('helpEnvol.subTitles.personnalsInformations') }}
    </h5>

    <div class="flex flex-col lg:flex-row lg:justify-between items-center">
      <div class="single-input-container lg:mr-8">
        <label for="full_name" class="sr-only">
          {{ $t('formLabels.fullName') }}
        </label>
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
            {{ $t('formLabels.fullName') }}
          </p>
        </div>
        <div class="relative">
          <input
            id="full_name"
            type="text"
            :value="full_name"
            class="
              p
              w-full
              border-2
              rounded-md
              outline-none
              focus:outline-none
              border-2
              placeholder-brand-carbon
              p-2
              transition-colors
              duration-500
              px-4
              h-20
            "
            :placeholder="$t('formLabels.fullName')"
            @change="$emit('onFullName', $event.target.value)"
          />
        </div>
      </div>

      <div class="single-input-container mt-16 lg:mt-0 lg:ml-8">
        <label for="email" class="sr-only">
          {{ $t('formLabels.email') }}
        </label>
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
            {{ $t('formLabels.email') }}
          </p>
        </div>
        <div class="relative">
          <input
            id="email"
            type="text"
            :value="email"
            class="
              p
              w-full
              border-2
              rounded-md
              outline-none
              focus:outline-none
              border-2
              placeholder-brand-carbon
              p-2
              transition-colors
              duration-500
              px-4
              h-20
            "
            :placeholder="$t('formLabels.email')"
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
            class="
              cursor-pointer
              h-6
              w-6
              border-brand-variant-main-gray
              rounded-md
            "
            @click="$emit('onDonationFromCompany', !isDonationFromCompany)"
          />
        </div>
        <div class="ml-3">
          <label
            class="caption-lg font-medium text-brand-carbon cursor-pointer"
            @click="$emit('onDonationFromCompany', !isDonationFromCompany)"
          >
            {{ $t('helpEnvol.thisGiftIsFromCompany') }}</label
          >
        </div>
      </div>
      <transition-expand>
        <div v-show="isDonationFromCompany">
          <div class="single-input-container full-size">
            <label for="company_name" class="sr-only">
              {{ $t('helpEnvol.companyToDonate') }}
            </label>
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
                {{ $t('helpEnvol.companyToDonate') }}
              </p>
            </div>
            <input
              id="company_name"
              type="text"
              :value="company_name"
              class="
                p
                w-full
                border-2
                rounded-md
                outline-none
                focus:outline-none
                border-2
                placeholder-brand-carbon
                p-2
                transition-colors
                duration-500
                px-4
                h-20
              "
              :placeholder="$t('helpEnvol.companyToDonate')"
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
            class="
              cursor-pointer
              h-6
              w-6
              border-brand-variant-main-gray
              rounded-md
            "
            @click="$emit('onHasCommentary', !hasCommentary)"
          />
        </div>
        <div class="ml-3">
          <label
            class="caption-lg font-medium text-brand-carbon cursor-pointer"
            @click="$emit('onHasCommentary', !hasCommentary)"
          >
            {{ $t('helpEnvol.leaveAcomment') }}
          </label>
        </div>
      </div>
      <transition-expand>
        <div v-show="hasCommentary">
          <div class="single-input-container full-size">
            <label for="company_name" class="sr-only">
              {{ $t('helpEnvol.Commentary') }}
            </label>
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
                {{ $t('helpEnvol.commentary') }}
              </p>
            </div>
            <textarea
              rows="4"
              :value="commentary"
              class="
                shadow-sm
                focus:outline-none
                p-3
                block
                w-full
                p
                sm:
                border-brand-variant-main-gray border-2
                rounded-md
              "
              :placeholder="$t('helpEnvol.yourComment')"
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
    // eslint-disable-next-line vue/prop-name-casing
    company_name: {
      type: String,
      default: '',
    },
    // eslint-disable-next-line vue/prop-name-casing
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
  &.full-size {
    @apply mt-12;
  }
  @screen lg {
    &:not(.full-size) {
      @apply w-1/2;
    }
    &:nth-child(2) {
      @apply mt-0;
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
