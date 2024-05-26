<script setup>
const props = defineProps({ blok: Object })

/* Fetch background */
const img = useImage()
const backgroundStyle = computed(() => {
  const imgUrl = img(props.blok.background_picture.filename, { width: 1000 })
  return { backgroundImage: `url('${imgUrl}')` }
})

/* Fetch posts */
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
    per_page: 8,
    sort_by: 'sort_by_date:desc,first_published_at:desc,created_at:desc',
  })
)
</script>

<template>
  <section
    v-editable="blok"
    class="home-news"
    :style="backgroundStyle"
    :aria-labelledby="`title-${blok._uid}`"
  >
    <div class="container padded">
      <NuxtLink :to="blok.link.cached_url" class="text-white hover:text-yellow">
        <h2 :id="`title-${blok._uid}`" class="home-news-title headline" v-html="blok.text" />
      </NuxtLink>
    </div>
    <div class="relative">
      <ShapesCurlyArrow class="arrow z-10" />
      <SiteSlider class="home-news-slider">
        <div class="dummy-card">
          
        </div>
        <LegosArticle
          v-for="post in posts.data.stories"
          :key="post.uuid"
          :article="{
            title: post.content.title,
            slug: post.full_slug,
            picture: post.content.picture,
            date: post.published_at,
            summary: post.content.summary
          }"
          class="home-news-card"
        />
        <NuxtLink :to="blok.link.cached_url">
          {{ $t('news.all') }}
        </NuxtLink>
    </SiteSlider>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.home-news {
  background-size: cover;
  background-attachment: fixed;

  &-title {
    font-size: var(--text-2xl);
    margin-top: 30vh;
  }

  &-card {
    width: 26vw;
    max-width: 500px;
    flex-shrink: 0;
  }

  &-slider {
    position: relative;
  }

  .dummy-card {
    width: 80px;
    flex-shrink: 0;
  }

  .arrow {
    position: absolute;
    top: 0;
    left: var(--site-padding);
    height: 13em;
    color: var(--yellow);
  }
}
</style>