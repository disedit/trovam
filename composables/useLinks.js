export const useLinks = () => {
  const { locale } = useI18n();

  return {
    internalLink: (link) => {
      if (!link) return "";

      const normalizedLink = link.startsWith("/") ? link : "/" + link;

      if (
        locale.value === "ca" ||
        normalizedLink.startsWith(`/${locale.value}/`)
      ) {
        return normalizedLink;
      }

      return locale.value === "es" || locale.value === "en"
        ? `/${locale.value}${normalizedLink}`
        : normalizedLink;
    },
  };
};
