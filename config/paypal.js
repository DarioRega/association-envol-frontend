import { loadScript } from '@paypal/paypal-js';
import { setDonationInSessionStorage } from '@/config/index';

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
      alert(
        `You have successfully created subscription ${data.subscriptionID}`
      );
    },
    onError(err) {
      if (typeof successCallback === 'function') {
        errorCallback(err);
      }
    },
  };
  return { paypal, config };
};

export const getPaypalSubscriptions = ($axios) => {
  return new Promise((resolve, reject) => {
    const auth = getPaypalAuth();
    $axios
      .get(`${process.env.PAYPAL_SANDBOX_URL}/v1/billing/plans`, {
        auth,
      })
      .then((res) => {
        resolve(res.data.plans);
      })
      .catch((err) => reject(err));
  });
};

export const findOrCreatePaypalPlan = async ({
  $axios,
  MAIN_DONATIONS_AMOUNTS,
  amount,
  intervalRef,
}) => {
  if (!MAIN_DONATIONS_AMOUNTS.includes(amount)) {
    const plan = await createPaypalPlan({ $axios, amount, intervalRef });
    return plan;
  } else {
    const plans = await getPaypalSubscriptions($axios);

    const targetPlan = plans.filter(
      (plan) => plan.name === `main-${amount}-${intervalRef}`
    );
    if (targetPlan.length > 0) {
      return targetPlan[0];
    }
  }
};

export const createPaypalPlan = ({ $axios, amount, intervalRef }) => {
  return new Promise((resolve, reject) => {
    const auth = getPaypalAuth();
    const plan = {
      product_id: process.env.PAYPAL_SANDBOX_CUSTOM_DONATIONS_PRODUCT_ID,
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
      .post(`${process.env.PAYPAL_SANDBOX_URL}/v1/billing/plans`, plan, {
        auth,
      })
      .then((response) => resolve(response.data));
  });
};

const getPaypalAuth = () => ({
  username: process.env.PAYPAL_KEY,
  password: process.env.PAYPAL_SECRET,
});
