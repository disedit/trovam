<script setup>
const props = defineProps({ blok: Object })
const { locale } = useI18n()
const version = useEnvironment()
const { slug } = useRoute().params
const storyblokApi = useStoryblokApi()

const orderedArtists = {
  by_uuids_ordered: props.blok.ordered_artists.join(',')
}

const autopopulate = {
  starts_with: props.path || `${slug[0]}/artistes/`,
  sort_by: 'content.name:asc',
  is_startpage: false
}

const filter = props.blok.ordered_artists.length > 0 ? orderedArtists : autopopulate

const { data: artists } = await useAsyncData(
  'artists_' + props.blok._uid,
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    excluding_fields: 'cta_url,cta_label,website,description,facebook,twitter,instagram,youtube,youtube_id,vimeo_id,spotify,bandcamp,soundcloud',
    resolve_relations: 'Artist.venue',
    ...filter
  })
)
</script>

<template>
  <div v-editable="blok">
    <h1>Artists Index</h1>
    <ul>
      <li v-for="artist in artists.data.stories" :key="artist.uuid">
        <NuxtLink :to="`/${artist.full_slug}`">
          <h2>{{ artist.content.name }}</h2>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
