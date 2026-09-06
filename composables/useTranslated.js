export const useTranslated = () => {
  const { locale } = useI18n();

  const tr = (object, key) => {
    if (locale.value === "ca") {
      return object?.[key];
    }

    return object?.[`${key}_${locale.value}`] || object?.[key];
  };

  return { tr };
};
