export default (context, inject) => {
  const getContent = async (agency, path) => {
    const file = `${context.app.i18n.locale}/${path}`;
    const defaultFile = `content/fr/${path}`;
    try {
      return await context.$content(file).fetch();
    } catch (e) {
      return context.$content(defaultFile).fetch();
    }
  };

  inject('getContent', getContent);
};
