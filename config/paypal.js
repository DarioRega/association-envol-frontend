import { loadScript } from '@paypal/paypal-js';
import { setDonationInSessionStorage } from '@/config/index';
import { API_URL } from '@/constantes';

export const paypalPromise = (params = {}) =>
  loadScript({
    'client-id': process.env.PAYPAL_KEY,
    currency: 'CHF',
    ...params,
  });

export const configureOneTimePaymentPaypal = async ({
  payload,
  successCallback,
  errorCallback,
}) => {
  const { selectedAmount } = payload;
  const paypal = await paypalPromise();

  const config = {
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: selectedAmount.amount,
            },
          },
        ],
      });
    },
    onApprove(data, actions) {
      const payloadDonation = {
        ...payload,
        isThankYouEmailSent: false,
        created_at: new Date(),
        amount: payload.selectedAmount.amount,
        interval: payload.selectedInterval.ref,
      };
      setDonationInSessionStorage(payloadDonation);
      if (typeof successCallback === 'function') {
        successCallback();
      }
      return actions.order.capture().then(function (details) {
        alert(`Transaction completed by ${details.payer.name.given_name}`);
      });
    },
    onError(err) {
      if (typeof successCallback === 'function') {
        errorCallback(err);
      }
    },
  };
  return { paypal, config };
};

export const configureSubscriptionsPaypal = async ({
  $axios,
  MAIN_DONATIONS_AMOUNTS,
  payload,
  successCallback,
  errorCallback,
}) => {
  const { selectedAmount, selectedInterval } = payload;
  const plan = await findOrCreatePaypalPlan({
    $axios,
    MAIN_DONATIONS_AMOUNTS,
    amount: selectedAmount.amount / 100,
    intervalRef: selectedInterval.ref,
  });

  // config
  const paypal = await paypalPromise({
    vault: true,
    intent: 'subscription',
  });
  const config = {
    createSubscription(data, actions) {
      return actions.subscription.create({
        plan_id: plan.id,
      });
    },
    onApprove(data, actions) {
      // set local storage
      const payloadDonation = {
        ...payload,
        isThankYouEmailSent: false,
        created_at: new Date(),
        amount: payload.selectedAmount.amount,
        interval: payload.selectedInterval.ref,
      };
      setDonationInSessionStorage(payloadDonation);
      if (typeof successCallback === 'function') {
        successCallback();
      }
    },
    onError(err) {
      if (typeof successCallback === 'function') {
        errorCallback(err);
      }
    },
  };
  return { paypal, config };
};
// TODO CHECK
export const findPaypalSubscription = ($axios, refName) => {
  return new Promise((resolve, reject) => {
    $axios.get(`${API_URL.PAYPAL_PLANS}/${refName}`).then((res) => {
      // eslint-disable-next-line no-prototype-builtins
      if (res.data) {
        resolve(res.data.plan_id);
      }
      resolve(null);
    });
  });
};

export const findOrCreatePaypalPlan = async ({
  $axios,
  MAIN_DONATIONS_AMOUNTS,
  amount,
  intervalRef,
}) => {
  const refName = `${
    MAIN_DONATIONS_AMOUNTS.includes(amount) ? 'main' : 'custom'
  }-${amount}-${intervalRef}`;

  let plan = await findPaypalSubscription($axios, refName);
  if (!plan) {
    plan = await createPaypalPlan({ $axios, amount, intervalRef });
  }

  return plan;
};

export const createPaypalPlan = ({ $axios, amount, intervalRef }) => {
  return new Promise((resolve, reject) => {
    const auth = getPaypalAuth();
    const plan = {
      product_id: process.env.PAYPAL_CUSTOM_PRODUCT_ID,
      name: `custom-${amount}-${intervalRef}`,
      billing_cycles: [
        {
          pricing_scheme: {
            version: 1,
            fixed_price: {
              currency_code: 'CHF',
              value: amount,
            },
          },
          frequency: {
            interval_unit: intervalRef.toUpperCase(),
            interval_count: 1,
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0,
        },
      ],
      payment_preferences: {
        service_type: 'PREPAID',
        auto_bill_outstanding: true,
        setup_fee: {
          currency_code: 'CHF',
          value: 0.0,
        },
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 1,
      },
    };

    $axios
      .post(`${process.env.PAYPAL_URL}/v1/billing/plans`, plan, {
        auth,
      })
      .then((response) => {
        $axios
          .post(`${API_URL.PAYPAL_PLANS}`, {
            name: response.data.name,
            plan_id: response.data.id,
          })
          .then((res) => {
            resolve(response.data);
          });
      });
  });
};

const getPaypalAuth = () => ({
  username: process.env.PAYPAL_KEY,
  password: process.env.PAYPAL_SECRET,
});
