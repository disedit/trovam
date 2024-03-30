export const useEnvironment = () => {
  const isPreview = useRuntimeConfig().public.environment !== 'production'
  return isPreview ? 'draft' : 'published'
}
