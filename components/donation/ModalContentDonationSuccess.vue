<template>
  <section class="bg-white">
    <div class="p-10">
      <div class="flex items-center justify-between">
        <div class="flex">
          <icon name="success_upload" size="100" />
          <h5 class="ml-4 text-brand-dark-blue font-medium">
            {{ $t('helpEnvol.successDonation.receivedDonation') }}
          </h5>
        </div>
        <span class="block cursor-pointer" @click="$emit('closeModal')">
          <icon name="close" size="75" />
        </span>
      </div>
      <div class="mt-6">
        <p class="font-medium">
          {{ $t('helpEnvol.successDonation.paragraph1') }}
        </p>
        <p class="mt-4 font-medium">
          {{ $t('helpEnvol.successDonation.paragraph2') }}
        </p>
      </div>
      <div class="mt-6 text-center">
        <h5 class="text-brand-dark-blue font-medium tracking-wider uppercase">
          {{ $t('helpEnvol.successDonation.thanks') }} !
        </h5>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ModalContentDonationSuccess',
};
</script>
