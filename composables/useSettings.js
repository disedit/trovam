export const useSettings = async () => {
  const siteSettings = useState('settings', () => null)
  const { locale } = useI18n()
  const version = useEnvironment()
  const storyblokApi = useStoryblokApi()
  const { data: settings } = await useAsyncData(
    'settings_' + locale.value,
    async () => {
      return await storyblokApi.get('cdn/stories/settings', {
        version,
        resolve_links: 'url',
        language: locale.value
      })
    },
    { watch: [locale] }
  )

  siteSettings.value = settings.value

  watch(settings, (newSettings) => {
    siteSettings.value = newSettings
  })

  return siteSettings
}