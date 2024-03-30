export const useSettings = async () => {
  const { locale } = useI18n()
  const version = useEnvironment()
  const storyblokApi = useStoryblokApi()
  const { data: config } = await useAsyncData(
    'settings_' + locale.value,
    async () => await storyblokApi.get('cdn/stories/settings', {
      version,
      resolve_links: 'url',
      language: locale.value
    }),
    { watch: [locale] }
  )

  return config.value.data.story.content
}