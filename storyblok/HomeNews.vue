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
    class="home-news background-filter"
    :style="backgroundStyle"
    :aria-labelledby="`title-${blok._uid}`"
  >
    <div class="container padded relative z-10">
      <NuxtLink :to="blok.link.cached_url" class="text-white hover:text-yellow">
        <h2 :id="`title-${blok._uid}`" class="home-news-title headline" v-html="blok.text" />
      </NuxtLink>
    </div>
    <div class="relative z-10">
      <ShapesCurlyArrow class="arrow z-10" />
      <SiteSlider class="home-news-slider hide-scrollbar" v-slot="{ clickable }">
        <div class="dummy-card" />
        <LegosArticle
          v-for="post in posts.data.stories"
          :key="post.uuid"
          :clickable="clickable"
          :article="post"
          class="home-news-card"
          no-picture
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
      <SiteNewsletter home />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.home-news {
  position: relative;
  background-size: cover;
  background-attachment: fixed;
  --card-width: 33vw;
  min-height: 100svh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

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
    width: 9rem;
    flex-shrink: 0;
  }

  .arrow {
    position: absolute;
    top: .5rem;
    left: calc(((100vw - min(100vw, var(--container-max-width))) / 2) + var(--site-padding));
    width: 8rem;
    color: var(--yellow);
    pointer-events: none;
    z-index: 0;
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
      color: var(--yellow);
    }
  }
}

.background-filter::before {
  background-attachment: fixed;
}

.background-filter::after {
  display: block;
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba($black, 0), rgba($black, 1));
  z-index: 0;
}

@include media('<lg') {
  .home-news {
    --card-width: 50vw;
  }
}

@include media('<md') {
  .home-news {
    --card-width: 65vw;
    background-attachment: scroll;

    &-title {
      margin-top: 10vh;
      text-align: left;
    }

    .dummy-card {
      width: 0;
    }

    .arrow {
      height: 5rem;
      z-index: 0;
      top: 4rem;
    }
  }

  .background-filter::before {
    background-attachment: scroll;
  }
}
</style>