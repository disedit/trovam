<script setup>
const props = defineProps({
  exclude: { type: [String, Number], default: null },
  noSummary: { type: Boolean, default: true }
})
const { locale } = useI18n()
const version = useEnvironment()
const storyblokApi = useStoryblokApi()
const { data: posts } = await useAsyncData(
  'posts_home',
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    excluding_fields: 'body',
    starts_with: `noticies/`,
    is_startpage: false,
    excluding_ids: props.exclude,
    per_page: 8,
    sort_by: 'sort_by_date:desc,first_published_at:desc,created_at:desc',
  })
)
</script>

<template>
  <section aria-labelledby="MoreNews" class="relative z-10">
    <div class="container padded-x">
      <h3 class="news-title headline flex items-center gap-4" id="MoreNews">
        <ShapesShape4 class="text-pink h-10" />
        <span class="compensate">{{ $t('news.all') }}</span>
      </h3>
    </div>
    <SiteSlider class="news-slider" v-slot="{ clickable }">
      <div class="padding" />
      <LegosArticle
        v-for="post in posts.data.stories"
        :key="post.uuid"
        :clickable="clickable"
        :article="post"
        :no-summary="noSummary"
        class="news-card"
      />
    </SiteSlider>
  </section>
</template>

<style lang="scss" scoped>
.news {
  &-title {
    font-size: var(--text-xl);
  }

  &-card {
    min-width: 30vw;
  }
}

.padding {
  width: 1px;
  flex-shrink: 0;
}
</style>