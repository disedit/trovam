<script setup>
const props = defineProps({ blok: Object })

const { page } = useRoute().query
const { locale } = useI18n()
const version = useEnvironment()
const storyblokApi = useStoryblokApi()

const { data: posts } = await useAsyncData(
  'posts',
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    excluding_fields: 'body',
    starts_with: props.blok.path || `/noticies/`,
    is_startpage: false,
    per_page: props.blok.per_page || 10,
    page
  })
)
</script>

<template>
  <div v-editable="blok">
    <StoryblokComponent
      v-for="blok in blok.header"
      :blok="blok"
    />
    <div class="container padded mb-10">
      <article v-for="post in posts.data.stories" :key="post.uuid">
        <NuxtLink :to="`/${post.full_slug}`">
          {{ post.content.title }}
        </NuxtLink>
      </article>
    </div>
    <StoryblokComponent
      v-for="blok in blok.footer"
      :blok="blok"
    />
  </div>
</template>
