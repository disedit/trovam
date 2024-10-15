<script setup>
const props = defineProps({ blok: Object })
const { longDate, shortDate } = useDate()

// Background image
const img = useImage()
const backgroundStyle = computed(() => {
  if (!props.blok.background?.filename) return false
  const imgUrl = img(props.blok.background.filename, { width: 1500 })
  return { backgroundImage: `url('${imgUrl}')` }
})

const storyblokApi = useStoryblokApi()
const { locale } = useI18n()
const version = useEnvironment()

// Stages
const { data: stages } = await useAsyncData(
  'allStages',
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    starts_with: 'escenaris/',
    is_startpage: false,
    resolve_relations: 'Stage.venue',
    excluding_fields: 'map,address,stages,picture,highlight'
  })
)
const stagesByUuid = Object.fromEntries(stages.value.data.stories.map(stage => [stage.uuid, stage]))

// Concerts
const { data: concertData } = await useAsyncData(
  'concerts',
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    starts_with: props.blok.concerts,
    is_startpage: false,
    resolve_relations: 'Artist.concert_with',
    filter_query: {
      concert_date: {
        is: 'not_empty'
      }
    },
    per_page: 100,
    excluding_fields: 'picture,background,website,description,facebook,twitter,tiktok,instagram,youtube,youtube_id,vimeo_id,spotify,bandcamp,soundcloud',
  })
)

const concerts = concertData.value.data.stories.map(artist => ({
  id: artist.id,
  date: artist.content.concert_date,
  time: artist.content.time_override,
  title: artist.content.name,
  stage: artist.content.stage,
  description: artist.content.concert_info,
  concert_with: artist.content.concert_with,
  cta_url: artist.content.cta_url,
  cta_label: artist.content.cta_label,
  link: artist.full_slug,
  type: 'concert',
  color: 'red'
}))

// Schedules
const { data: scheduleData } = await useAsyncData(
  'schedules',
  async () => {
    if (!props.blok.schedules.length) return []
    return await storyblokApi.get(`cdn/stories`, {
      version,
      language: locale.value,
      by_uuids_ordered: props.blok.schedules.join(','),
      excluding_fields: 'header,seo_title,seo_description,seo_picture',
      per_page: 400,
    })
  }
)

const schedules = scheduleData.value.hasOwnProperty('data') ? scheduleData.value.data.stories : []
const scheduleEvents = []

// Filters
const filters = [
  { type: 'concert', title: 'Live', color: 'red' }
]

// Merge pro schedules
schedules.forEach(schedule => {
  filters.push({
    type: schedule.uuid,
    title: schedule.content.title,
    color: schedule.content.color
  })
  schedule.content.schedule.forEach(event => {
    scheduleEvents.push({
      id: event._uid,
      date: event.date,
      time: event.time,
      title: event.title,
      stage: event.stage,
      description: event.description,
      type: schedule.uuid,
      color: schedule.content.color
    })
  })
})

// Merge all events
const allEvents = concerts.concat(scheduleEvents)
const sortedEvents = allEvents.sort((a, b) => new Date(a.date) - new Date(b.date))

// Hide dates if repeated
const firstInstanceOfDate = (date, index) => {
  if (index === 0) return true
  const previousDate = sortedEvents[index - 1].date
  return shortDate(date) !== shortDate(previousDate)
}
</script>

<template>
  <div v-editable="blok" class="pro-schedule">
    <div v-if="backgroundStyle" class="background z-1">
      <div class="background-holder">
        <div class="page-background" :style="backgroundStyle" />
      </div>
    </div>
    <div class="relative z-10 -mt-[100vh]">
      <StoryblokComponent
        v-for="blok in blok.header"
        :key="blok._uid"
        :blok="blok"
      />
      <div class="container container-sm padded pro-schedule-events">
        <template v-for="(event, i) in sortedEvents" :key="i">
          <h2 v-if="firstInstanceOfDate(event.date, i)" class="pro-schedule-date">
            {{ longDate(event.date) }}
          </h2>
          <LegosEvent :event="event" :stages="stagesByUuid" :class="`color-${event.color}`" />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pro-schedule-events {
  display: flex;
  flex-direction: column;
  gap: var(--site-padding);
  padding-bottom: calc(3rem + 15vh);
}

.pro-schedule-date {
  font-weight: 900;
  font-size: var(--text-lg);
  margin-top: var(--spacer-8);
  line-height: 1.25;
  text-wrap: balance;
}

@include media('<md') {
  .pro-schedule-date {
    font-size: var(--text-md);
  }
}
</style>