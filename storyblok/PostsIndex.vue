<script setup>
const props = defineProps({ blok: Object })

const { page } = useRoute().query
const storyblokApi = useStoryblokApi()

const { data: posts } = await useAsyncData(
  'posts',
  async () => await storyblokApi.get(`cdn/stories`, {
    version: 'published',
    excluding_fields: 'body',
    starts_with: props.blok.path || `noticies/`,
    is_startpage: false,
    per_page: props.blok.per_page || 16,
    sort_by: 'created_at:desc',
    page
  }), {
    dedupe: 'defer',
    getCachedData: (key, nuxtApp) => {
      const cachedContent = useState('posts')
      return cachedContent.value
      ? cachedContent.value
      : nuxtApp.payload.data[key]
    }
  }
)
</script>

<template>
  <div v-editable="blok" class="posts-index">
    <StoryblokComponent
      v-for="blok in blok.header"
      :blok="blok"
    />
    <div class="container padded mb-10">
      <LegosArticle
        v-for="post in posts.data.stories"
        :key="post.uuid"
        :article="post"
      />
    </div>
    <div class="relative z-10">
      <StoryblokComponent
        v-for="blok in blok.footer"
        :blok="blok"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.posts-index {
  .container {
    display: grid;
    gap: var(--site-padding);
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    margin-block-end: var(--spacer-10);
  }
}

@include media('<md') {
  .posts-index {
    .container {
      grid-template-columns: 1fr;
    }
  }
}
</style>