<script setup>
const props = defineProps({
  article: { type: Object, required: true },
  level: { type: Number, default: 2 }
})

const hTag = computed(() => `h${props.level}`)
const { shortDate } = useDate()

function random(min, max) {
  return Math.random() * (max - min) + min
}
</script>

<template>
  <NuxtLink
    :to="`/${article.slug}`"
    class="article"
    :style="{
      '--rotate': `${random(-3,3)}deg`
    }"
  >
    <div v-if="article.picture" class="article-picture">
      <NuxtImg
        :src="article.picture?.filename"
        :alt="article.picture?.alt"
      />
    </div>
    <time :datetime="article.date">
      {{ shortDate(article.date) }}
    </time>
    <Component :is="hTag" class="article-title">
      {{ article.title }}
    </Component>
    <p class="article-summary">
      {{ article.summary }}
    </p>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.article {
  --card-padding: var(--spacer-4);
  background: var(--white);
  color: var(--black);
  transition: .25s ease;
  padding: var(--card-padding);
  display: flex;
  flex-direction: column;
  gap: var(--card-padding);
  --focus-weight: 4px;

  &:hover {
    transform: scale(1.05) translateY(-2%) rotate(var(--rotate, -2deg));
    box-shadow: 0 0 30px rgba($black, .5);

    .article-title {
      text-decoration: underline;
      text-underline-offset: .1em;
    }
  }

  &-title {
    font-weight: bold;
    font-size: var(--text-lg);
    line-height: 1;
  }

  &-summary {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-block-start: auto;
  }

  &-picture {
    img {
      aspect-ratio: 1;
      object-fit: cover;
      height: 100%;
      width: 100%;
      max-height: 200px;
    }
  }
}
</style>