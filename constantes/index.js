export const API_URL = {
  SCHOLARSHIP: `${process.env.BACK_URL}/scholarship`,
  FILE_DRAG_AND_DROP_URL: `${process.env.BACK_URL}/file-drag-drop`,

  CONTACT: `${process.env.BACK_URL}/contact`,

  RAPPORTS: `${process.env.BACK_URL}/rapports`,
  RAPPORTS_ONLY_WEBSITE_RELATED: `${process.env.BACK_URL}/rapports?onlyWebsiteRelated`,

  PRODUCTS_METADATA: `${process.env.BACK_URL}/products/metadata`,
  THANK_YOU_URL: `${process.env.BACK_URL}/donations/thankYou`,

  PAYPAL_PLANS: `${process.env.BACK_URL}/paypal/plans`,
  PAYPAL_API_BILLING_PLANS: `${process.env.PAYPAL_URL}/v1/billing/plans`,

  STRIPE_FIND_OR_CREATE: `${process.env.BACK_URL}/products/prices/findOrCreate`,
  CREATE_STRIPE_CHECKOUT_SESSION: `${process.env.BACK_URL}/donations/session`,
};
