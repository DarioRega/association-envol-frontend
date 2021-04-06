<template>
  <section class="bg-white">
    <div class="p-10">
      <div class="flex items-center justify-between">
        <div class="flex">
          <icon name="success_upload" size="100" />
          <h5 class="ml-4 text-brand-dark-blue font-medium">Donation reçue</h5>
        </div>
        <span class="block cursor-pointer" @click="$emit('closeModal')">
          <icon name="close" size="75" />
        </span>
      </div>
      <div class="mt-6">
        <p class="font-medium">
          L'association Envol vous remercie vivement de votre don. Son comité
          étudie avec soin les nombreuses demandes de bourses qui lui sont
          adressées. Il répond favorablement aux demandes jugées prioritaires et
          réalisables en soulageant les bénéficiaires des coûts de leur
          formation pour lesquels ils ou elles n'ont trouvé ni aide ni solution.
        </p>
        <p class="mt-4 font-medium">
          Par votre don, vous contribuez au soutien qu'Envol leur apporte et
          nous vous en sommes très reconnaissants.
        </p>
      </div>
      <div class="mt-6 text-center">
        <h5 class="text-brand-dark-blue font-medium tracking-wider">MERCI !</h5>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ModalContentDonationSuccess',
};
</script>

<style scoped></style>
