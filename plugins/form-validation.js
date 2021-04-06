const errorsText = require('~/content/fr/formErrors.json');

export default (context, inject) => {
  /* eslint-disable */
  //prettier-ignore
  const validators = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneNumber:/^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/,
    fullName: /^([^0-9]*)$/,
    subject: /^[a-zA-Z]{3,}$/,
    message: /^[a-zA-Z]{5,}$/,
    birthdate: /^(0?[1-9]|[12][0-9]|3[01])[\.](0?[1-9]|1[012])[\.]\d{4}$/,
  }


  const ignoredFields = ['gender','phoneNumber','remarks']
  /* eslint-enable */

  const validate = (property, value, shouldNotValidate) => {
    if (!ignoredFields.includes(property)) {
      if (!value) {
        return formErrors.empty;
      }
      if (property.includes('file')) return;

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
  birthdate: errorsText.birthdate,
  lastName: errorsText.lastName,
  message: errorsText.message,
};
