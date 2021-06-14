export const setDonationInSessionStorage = (payload) => {
  sessionStorage.setItem('donation', JSON.stringify(payload));
};

export const autoDestructDonationSessionStorage = () => {
  setTimeout(() => {
    sessionStorage.removeItem('donation');
  }, 300000);
};
