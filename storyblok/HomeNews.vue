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
      <SiteSlider class="home-news-slider" v-slot="{ clickable }">
        <div class="dummy-card" />
        <LegosArticle
          v-for="post in posts.data.stories"
          :key="post.uuid"
          :clickable="clickable"
          :article="post"
          class="home-news-card"
        />
        <NuxtLink
          :to="blok.link.cached_url"
          class="home-news-more"
          draggable="false"
        >
          <ShapesShape7 />
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
  --card-width: 33vw;

  &-title {
    font-size: var(--text-2xl);
    margin-top: 20vh;
    line-height: 1.1;
  }

  &-card {
    width: var(--card-width);
    max-width: 500px;
    flex-shrink: 0;
  }

  &-slider {
    position: relative;
    padding-block: 4rem;
    margin-block-start: -2rem;
  }

  .dummy-card {
    width: 80px;
    flex-shrink: 0;
  }

  .arrow {
    position: absolute;
    top: 1rem;
    left: var(--site-padding);
    height: 13em;
    color: var(--yellow);
    pointer-events: none;
  }

  &-more {
    width: var(--card-width);
    max-width: 500px;
    border: 3px var(--white) solid;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--white);
    font-size: var(--text-lg);
    gap: var(--spacer-5);

    &:hover {
      text-decoration: underline;
    }

    svg {
      height: 4em;
      color: var(--blue);
    }
  }
}

@include media('<lg') {
  .home-news {
    --card-width: 50vw;
  }
}

@include media('<md') {
  .home-news {
    --card-width: 65vw;

    &-title {
      margin-top: 10vh;
      text-align: center;
    }

    .dummy-card {
      width: 4rem;
    }

    .arrow {
      height: 5rem;
      z-index: 0;
      top: 4rem;
    }
  }
}
</style>