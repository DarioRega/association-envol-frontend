const errorsText = require('~/content/fr/formErrors.json');

export default (context, inject) => {
  /* eslint-disable */
  //prettier-ignore
  const validators = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneNumber:/^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/,
    fullName: /^[_A-z]*((-|\s)*[_A-z])*$/,
    subject: /^[a-zA-Z]{3,}$/,
    message: /^[a-zA-Z]{5,}$/,
    sex: /^[a-zA-Z]+$/
  }
  /* eslint-enable */

  const validate = (property, value, shouldNotValidate) => {
    if (!shouldNotValidate) {
      if (!value) {
        return formErrors.empty;
      }

      if (property === 'sex') {
        return;
      }
      if (property === 'phoneNumber' && !value) return;

      if (!validators[property].test(value)) {
        return formErrors[property];
      }
    }
  };

  inject('validateValue', (property, value, shouldNotValidate) =>
    validate(property, value, shouldNotValidate)
  );
};

const formErrors = {
  empty: errorsText.emptyField,
  email: errorsText.email,
  phoneNumber: errorsText.phoneNumber,
  firstName: errorsText.firstName,
  lastName: errorsText.lastName,
  message: errorsText.message,
};
