<template>
  <div>
    <p class="font-semibold text-md md:text-lg text-brand-dark-blue">
      Récapitulatif
    </p>
    <div clas="flex flex-wrap">
      <p class="inline-flex flex-none">Montant du don sélectionné :</p>
      <p class="inline-flex font-medium">{{ selectedAmount.amount }} CHF</p>
    </div>
    <div clas="flex flex-wrap">
      <p class="inline-flex flex-none">Récurrence :</p>
      <p class="inline-flex font-medium">{selectedInterval.interval}</p>
    </div>
    <div
      v-if="customer.company_name && isDonationFromCompany"
      clas="flex flex-wrap"
    >
      <p class="inline-flex flex-none">Entreprise de référence :</p>
      <p class="inline-flex font-medium">{{ customer.company_name }}</p>
    </div>
    <div clas="flex flex-wrap">
      <p class="inline-flex flex-none">Email :</p>
      <p class="inline-flex font-medium">{{ customer.email }}</p>
    </div>
    <div v-if="commentary && hasCommentary" clas="flex flex-wrap">
      <p class="inline-flex flex-none">Commentaire :</p>
      <p class="inline-flex font-medium">{{ commentary }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumeStep',
  props: {
    selectedAmount: {
      type: Object,
      required: true,
    },
    selectedInterval: {
      type: Object,
      required: true,
    },
    customer: {
      type: Object,
      required: true,
    },
    commentary: {
      type: String,
      required: true,
    },
    hasCommentary: {
      type: Boolean,
      default: false,
    },
    isDonationFromCompany: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
