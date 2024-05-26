<script setup>
const props = defineProps({
  article: { type: Object, required: true },
  level: { type: Number, default: 2 },
  clickable: { type: Boolean, default: true },
  noSummary: { type: Boolean, default: false }
})

const router = useRouter()
const hTag = computed(() => `h${props.level}`)
const { shortDate } = useDate()

function random(min, max) {
  return Math.random() * (max - min) + min
}

function navigate(e, to) {
  e.preventDefault()
  if (props.clickable) {
    router.push(to)
  }
}

const post = {
  title: props.article.content.title,
  slug: props.article.full_slug,
  picture: props.article.content.picture,
  date: props.article.published_at,
  summary: props.article.content.summary
}
</script>

<template>
  <a
    :href="`/${post.slug}`"
    class="article"
    :style="{
      '--rotate': `${random(-3,3)}deg`
    }"
    draggable="false"
    @click="navigate($event, `/${post.slug}`)"
  >
    <div v-if="post.picture" class="article-picture">
      <NuxtImg
        :src="post.picture?.filename"
        :alt="post.picture?.alt"
        draggable="false"
      />
    </div>
    <time :datetime="post.date">
      {{ shortDate(post.date) }}
    </time>
    <Component :is="hTag" class="article-title" draggable="false">
      {{ post.title }}
    </Component>
    <div v-if="!noSummary" class="hidden md:block">
      <p class="article-summary">
        {{ post.summary }}
      </p>
    </div>
  </a>
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

@include media('<md') {
  .article {
    &-title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}

@media (hover: hover) {
  .article {
    &:hover {
      transform: scale(1.05) translateY(-2%) rotate(var(--rotate, -2deg));
      box-shadow: 0 0 30px rgba($black, .5);

      .article-title {
        text-decoration: underline;
        text-underline-offset: .1em;
      }
    }
  }
}
</style>