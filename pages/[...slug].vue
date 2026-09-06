<script setup>
/* Load site settings */
const settings = await useSettings()
const global = settings?.value?.data?.story?.content

/* Load page */
const { locale } = useI18n()
const { tr } = useTranslated() 
const { slug } = useRoute().params
const version = useEnvironment()
const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join('/') : 'home',
  {
    version,
    resolve_relations: 'Artist.stage,Stage.venue,Artist.extra_concerts'
  }
)
const page = story?.value?.content

/* SEO Metatags */
const siteName = global?.site_name
const title = slug && slug.length > 0 ? `${tr(page, 'title') || page.name} - ${siteName}` : siteName
const ogTitle = tr(page, 'seo_title') || title
const description = tr(page, 'seo_description') || tr(page, 'summary') || tr(global, 'seo_description')
const ogImage = page.seo_picture?.filename || page.picture?.filename || global?.seo_picture?.filename
const keywords = tr(page, 'seo_keywords') || tr(global, 'seo_keywords') || ''
const twitterSite = global?.twitter_account
useSeoMeta({
  title,
  ogTitle,
  description,
  ogDescription: description,
  ogImage,
  twitterCard: 'summary_large_image',
  keywords,
  ogSiteName: siteName,
  twitterSite,
  ogType: 'website',
  ogLocale: locale
})
useHead({ title })
</script>

<template>
  <StoryblokComponent
    v-if="story"
    :blok="story.content"
    :meta="story"
  />
</template>
