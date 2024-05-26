<script setup>
const props = defineProps({ blok: Object })
const { locale } = useI18n()
const version = useEnvironment()
const { slug } = useRoute().params
const storyblokApi = useStoryblokApi()
const { data: artists } = await useAsyncData(
  'artists_' + props.blok._uid,
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    excluding_fields: 'website,description,facebook,twitter,instagram,youtube,youtube_id,vimeo_id,spotify,bandcamp,soundcloud',
    resolve_relations: 'Artist.stage',
    starts_with: props.path || `${slug[0]}/artistes/`,
    sort_by: 'content.concert_date:asc',
    is_startpage: false
  })
)

const concertsByDate = computed(() => {
  return artists.value.data.stories.reduce((groupedConcerts, artist) => {
    const date = artist.content.concert_date.split(' ')[0]
    if (!groupedConcerts[date]) {
      groupedConcerts[date] = []
    }
    groupedConcerts[date].push(artist)
    return groupedConcerts
  }, {})
})

const { longDate } = useDate()
</script>

<template>
  <div v-editable="blok">
    <h1>Concerts Index</h1>
    <section v-for="(concerts, date) in concertsByDate">
      <pre>{{ longDate(date) }}</pre>
      <ul>
        <li v-for="concert in concerts" :key="concert.uuid">
          {{ concert.content.name }}
          at {{ concert.content.concert_date }}
          <pre>{{ concert.content.stage.name }}</pre>
        </li>
      </ul>
    </section>
  </div>
</template>
