export const useSettings = async () => {
  const siteSettings = useState("settings", () => null);
  const version = useEnvironment();
  const storyblokApi = useStoryblokApi();
  const { data: settings } = await useAsyncData(
    "settings",
    async () => {
      return await storyblokApi.get("cdn/stories/settings", {
        version,
        resolve_links: "url",
      });
    },
    {
      dedupe: "defer",
      getCachedData: (key, nuxtApp) => {
        const cachedSettings = useState("settings");
        return cachedSettings.value
          ? cachedSettings.value
          : nuxtApp.payload.data[key];
      },
    },
  );

  siteSettings.value = settings.value;

  watch(settings, (newSettings) => {
    siteSettings.value = newSettings;
  });

  return siteSettings;
};
