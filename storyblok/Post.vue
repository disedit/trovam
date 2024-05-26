<script setup>
defineProps({ blok: Object, meta: Object })

const localePath = useLocalePath()
const { longDate } = useDate()
</script>

<template>
  <article v-editable="blok" class="article container container-sm padded navbar-safest-area">
    <div class="article-meta">
      <NuxtLink :to="localePath('/noticies')" class="article-back">
        <ShapesShape3 />
        <span class="compensate">{{ $t('news.title') }}</span>
      </NuxtLink>
      <time class="article-date" :datetime="meta.first_published_at">
        {{ longDate(meta.first_published_at) }}
      </time>
    </div>
    <h1 class="article-title">{{ blok.title }}</h1>
    <div class="article-summary">{{ blok.summary }}</div>
    <div class="article-card">
      <div v-if="blok.picture?.filename && !blok.hide_picture_inside" class="article-picture">
        <NuxtPicture
          format="avif,webp"
          :src="blok.picture.filename"
          :img-attrs="{ alt: blok.picture?.alt || '' }"
          sizes="100vw sm:50vw md:400px"
        />
      </div>
      <div class="article-content">
        <StoryblokComponent
          v-for="blok in blok.body"
          :key="blok._uid"
          :blok="blok"
        />
      </div>
    </div>
  </article>
  <LegosMoreArticles :exclude="meta.id" />
</template>

<style lang="scss" scoped>
.article {
  &-meta {
    font-size: var(--text-base);
    margin-block-start: calc(10vh + 2rem);
    margin-block-end: var(--spacer-6);
  }

  &-back {
    display: inline-flex;
    align-items: center;
    color: var(--white);
    font-weight: bold;
    gap: var(--spacer-2);
    
    svg {
      color: var(--pink);
      height: 1em;
      width: 1em;
      flex-shrink: 0;
    }

    &:hover {
      text-decoration: underline;
      text-underline-offset: 6px;
      text-decoration-color: var(--pink);
    }
  }

  &-date {
    &::before {
      content: ' / ';
    }
  }

  &-title {
    font-weight: bold;
    font-size: var(--text-3xl);
    line-height: 1;
  }

  &-summary {
    opacity: .75;
    font-size: var(--text-lg);
    margin: var(--spacer-4) 0 var(--spacer-8);
  }

  &-card {
    --card-padding: var(--site-padding);
    background: var(--white);
    padding: var(--card-padding);
    font-size: var(--text-md);
    color: var(--black);
    display: flex;
    flex-direction: column;
    gap: var(--card-padding);
    margin-block-end: var(--spacer-10);
  }

  &-picture {
    :deep(img) {
      width: 100%;
    }
  }
}

@include media('<md') {
  .article {
    &-meta {
      margin-block-start: 0;
    }

    &-summary {
      font-size: var(--text-md);
    }
  }
}
</style>

<style lang="scss">
.article-content {
  display: flex;
  flex-direction: column;
  gap: var(--card-padding);

  a {
    text-decoration: underline;
  }

  ul {
    list-style: disc;
    padding-inline-start: 1rem;
  }

  li {
    padding-inline-start: .5rem;
    margin-block-end: .5em;
  }
}
</style>