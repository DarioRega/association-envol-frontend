export default (context, inject) => {
  const i18n = context.app.i18n;
  const getLabels = () => [
    {
      id: 'sex',
      type: 'select',
      isOptional: false,
      placeholder: i18n.t('formLabels.sex'),
      options: [
        {
          value: i18n.t('formLabels.mister'),
        },
        {
          value: i18n.t('formLabels.miss'),
        },
      ],
    },
    {
      id: 'fullName',
      type: 'input',
      isOptional: false,
      placeholder: i18n.t('formLabels.fullName'),
    },
    {
      id: 'email',
      type: 'input',
      isOptional: false,
      placeholder: i18n.t('formLabels.email'),
    },
    {
      id: 'phoneNumber',
      type: 'input',
      isOptional: true,
      placeholder: i18n.t('formLabels.phoneNumber'),
    },
    {
      id: 'subject',
      type: 'input',
      isOptional: false,
      placeholder: i18n.t('formLabels.subject'),
    },
    {
      id: 'message',
      type: 'textarea',
      isOptional: false,
      placeholder: i18n.t('formLabels.message'),
    },
  ];
  inject('getFormsLabels', () => getLabels());
};
