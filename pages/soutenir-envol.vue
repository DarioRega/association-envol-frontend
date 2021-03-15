<template>
  <section>
    <container> hello soutenir</container>
    <small-container>
      <div class="flex justify-between items-center">
        <div
          v-for="item in getMockProducts"
          :key="item.id"
          class="rounded-md border border-2 border-brand-dark-blue h-16 w-16 flex items-center justify-center"
          :class="
            selectedProductId === item.id
              ? 'shadow-md text-white bg-brand-dark-blue'
              : 'text-brand-dark-blue bg white'
          "
          @click="handleSelectProduct(item)"
        >
          {{ item.amount }}
        </div>
      </div>
      <div class="flex mt-24">
        <p>Autre montant :</p>
        <input
          v-model="customAmount"
          type="text"
          :class="
            customAmount === amountSelected
              ? 'shadow-md text-white bg-brand-dark-blue'
              : 'text-brand-dark-blue bg white'
          "
          @change="amountSelected = $event.target.value"
        />
      </div>
      <div class="mt-24">
        <div id="card-element"></div>
      </div>
    </small-container>
  </section>
</template>

<script>
import SmallContainer from '@/components/containers/SmallContainer';
const mockProducts = [
  {
    id: 1,
    amount: 20,
  },
  {
    id: 2,
    amount: 50,
  },
  {
    id: 3,
    amount: 100,
  },
];
// TODO make fields of form disabled when payment processing (this.paymentProcessing) is active
export default {
  name: 'SoutenirEnvol',
  components: { SmallContainer },
  layout: 'helpEnvol',
  data() {
    return {
      stripe: undefined,
      card: {},
      paymentProcessing: false,
      selectedProductId: null,
      costumer: {
        payment_method_id: undefined,
        amount: '',
        product_id: null,
        first_name: 'Dario',
        last_name: 'Regazzoni',
        email: 'dario.regazzoni@outlook.fr',
        address: 'Chemin de Rouga 17',
        city: 'Lausanne',
        state: 'Vaud',
        zip_code: '1006',
      },
      shouldShowTankYou: false,
      amountSelected: 50,
      customAmount: 0,
    };
  },
  computed: {
    // TODO DO ON THE ENDPOINT TO FETCH ONLY THE MAIN PRODUCTS
    getMockProducts() {
      return mockProducts;
    },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.stripe = Stripe(process.env.STRIPE_KEY);
    const elements = this.stripe.elements();
    this.cardElement = elements.create('card', {
      classes: {
        base:
          'form-input form-outline block w-full py-3 px-4 transition ease-in-out duration-150',
      },
    });
    this.cardElement.mount('#card-element');
  },
  methods: {
    handleSelectProduct(item) {
      this.amountSelected = item.amount;
      this.selectedProductId = item.id;
    },
    async processPayment() {
      this.paymentProcessing = true;
      const { paymentMethod, error } = await this.stripe.createPaymentMethod(
        'card',
        this.cardElement,
        {
          billing_details: {
            name: `${this.costumer.first_name} ${this.costumer.last_name}`,
            email: this.costumer.email,
            address: {
              line1: this.costumer.address,
              city: this.costumer.city,
              state: this.costumer.state,
              postal_code: this.costumer.zip_code,
            },
          },
        }
      );
      if (error) {
        this.paymentProcessing = false;
        alert(error);
      } else {
        this.costumer.payment_method_id = paymentMethod.id;
        this.costumer.amount = this.amountSelected;
        this.costumer.product_id = this.selectedProductId;

        this.$axios
          .post('/api/donate', this.costumer)
          .then((response) => {
            this.paymentProcessing = false;

            this.shouldShowTankYou = true;
          })
          .catch((error) => {
            this.paymentProcessing = false;
            alert(error);
          });
      }
    },
  },
};
</script>

<!--https://morioh.com/p/a5b771b08911-->
