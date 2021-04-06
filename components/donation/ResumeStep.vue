<template>
  <div>
    <h5 class="font-medium text-brand-dark-blue mb-20">Récapitulatif</h5>
    <div clas="flex flex-wrap">
      <p class="inline-flex flex-none">Montant du don sélectionné :</p>
      <p class="inline-flex font-semibold">
        {{
          selectedAmount.id
            ? selectedAmount.amount / 100
            : selectedAmount.amount
        }}
        CHF
      </p>
    </div>
    <div clas="flex flex-wrap">
      <p class="inline-flex flex-none">Récurrence :</p>
      <p class="inline-flex font-semibold">{{ selectedInterval.name }}</p>
    </div>
    <div v-if="company_name && isDonationFromCompany" clas="flex flex-wrap">
      <p class="inline-flex flex-none">Entreprise de référence :</p>
      <p class="inline-flex font-semibold">{{ company_name }}</p>
    </div>
    <div v-if="commentary && hasCommentary" clas="flex flex-wrap">
      <p class="inline-flex flex-none">Commentaire :</p>
      <p class="inline-flex font-semibold">{{ commentary }}</p>
    </div>
    <div class="mt-4">
      <p>
        En cliquant sur le bouton <i>Procéder au don</i>, vous allez être
        redirigé vers une <b>plateforme sécurisée</b> pour le paiement.
      </p>
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
    commentary: {
      type: String,
      required: false,
    },
    company_name: {
      type: String,
      required: false,
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
