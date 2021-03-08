const errorsText = require('~/content/fr/formErrors.json');

export default (context, inject) => {
  /* eslint-disable */
  //prettier-ignore
  const validators = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneNumber:/^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/,
    firstName: /^[_A-z]*((-|\s)*[_A-z])*$/,
    lastName: /^[_A-z]*((-|\s)*[_A-z])*$/,
    message: /^[a-zA-Z]{5,}$/
  }
  /* eslint-enable */

  const validate = (property, value) => {
    if (!value) {
      return formErrors.empty;
    }

    if (property === 'serviceId') {
      return;
    }

    if (!validators[property].test(value)) {
      return formErrors[property];
    }
  };

  inject('validateValue', (property, value) => validate(property, value));
};

const formErrors = {
  empty: errorsText.emptyField,
  email: errorsText.email,
  phoneNumber: errorsText.phoneNumber,
  firstName: errorsText.firstName,
  lastName: errorsText.lastName,
  message: errorsText.message,
};
