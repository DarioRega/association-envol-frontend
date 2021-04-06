<template>
  <div>
    <h5 class="font-medium text-brand-dark-blue mb-20">Récapitulatif</h5>
    <div class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">Montant du don sélectionné :</p>
      <p class="inline-flex font-semibold">
        {{
          selectedAmount.id
            ? selectedAmount.amount / 100
            : selectedAmount.amount
        }}
        CHF
      </p>
    </div>
    <div class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">Récurrence :</p>
      <p class="inline-flex font-semibold">{{ selectedInterval.name }}</p>
    </div>
    <div class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">Personne de référence :</p>
      <p class="inline-flex font-semibold">{{ full_name }}</p>
    </div>
    <div class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">Email :</p>
      <p class="inline-flex font-semibold">{{ email }}</p>
    </div>
    <div v-if="company_name && isDonationFromCompany" class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">Entreprise de référence :</p>
      <p class="inline-flex font-semibold">{{ company_name }}</p>
    </div>
    <div v-if="commentary && hasCommentary" class="flex flex-wrap">
      <p class="inline-flex flex-none mr-2">Commentaire :</p>
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
    full_name: {
      type: String,
      required: true,
    },
    email: {
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
