export default (context, inject) => {
  const i18n = context.app.i18n;
  const getLabels = (typeOfForm) => {
    if (typeOfForm === 'contact') {
      return [
        {
          id: 'gender',
          type: 'select',
          isOptional: false,
          placeholder: i18n.t('formLabels.gender'),
          options: [
            {
              value: 2,
              placeholder: i18n.t('formLabels.mister'),
            },
            {
              value: 1,
              placeholder: i18n.t('formLabels.miss'),
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
    }

    return [
      {
        id: 'gender',
        type: 'select',
        isOptional: false,
        placeholder: i18n.t('formLabels.gender'),
        options: [
          {
            value: 2,
            placeholder: i18n.t('formLabels.mister'),
          },
          {
            value: 1,
            placeholder: i18n.t('formLabels.miss'),
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
        id: 'birthdate',
        type: 'input',
        isOptional: false,
        placeholder: i18n.t('formLabels.birthdate'),
      },
      {
        id: 'remarks',
        type: 'textarea',
        isOptional: true,
        placeholder: i18n.t('formLabels.remarks'),
      },
      {
        id: 'files',
        type: 'files',
        isOptional: false,
        placeholder: i18n.t('formLabels.files'),
      },
    ];
  };

  inject('getFormsLabels', (typeOfForm) => getLabels(typeOfForm));
};
