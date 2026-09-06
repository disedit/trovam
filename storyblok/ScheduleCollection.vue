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
const { tr } = useTranslated()
const version = useEnvironment()

// Stages
const { data: stages } = await useAsyncData(
  'allStages',
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    starts_with: 'escenaris/',
    is_startpage: false,
    resolve_relations: 'Stage.venue',
    excluding_fields: 'map,address,stages,picture,highlight'
  }), {
    dedupe: 'defer',
    getCachedData: (key, nuxtApp) => {
      const cachedContent = useState('allStages')
      return cachedContent.value
      ? cachedContent.value
      : nuxtApp.payload.data[key]
    }
  }
)
const stagesByUuid = Object.fromEntries(stages.value.data.stories.map(stage => [stage.uuid, stage]))

const ticketsFilter = (props.blok.only_tickets) ? { cta_url: { is: 'not_empty' } } : {}

// Concerts
const { data: concertData } = await useAsyncData(
  'concerts_' + props.blok._uid,
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    starts_with: props.blok.concerts,
    is_startpage: false,
    resolve_relations: 'Artist.concert_with',
    filter_query: {
      concert_date: {
        is: 'not_empty'
      },
      ...ticketsFilter,
    },
    per_page: 100,
    excluding_fields: 'picture,background,website,description,facebook,twitter,tiktok,instagram,youtube,youtube_id,vimeo_id,spotify,bandcamp,soundcloud',
  }), {
    dedupe: 'defer',
    getCachedData: (key, nuxtApp) => {
      const cachedContent = useState('concerts_' + props.blok._uid)
      return cachedContent.value
      ? cachedContent.value
      : nuxtApp.payload.data[key]
    }
  }
)

const concerts = concertData.value.data.stories.map(artist => ({
  id: artist.id,
  date: artist.content.concert_date,
  time: artist.content.time_override,
  title: artist.content.name,
  stage: artist.content.stage,
  description: tr(artist.content, 'concert_info'),
  concert_with: artist.content.concert_with,
  cta_url: artist.content.cta_url,
  cta_label: tr(artist.content, 'cta_label'),
  link: artist.full_slug,
  type: 'concert',
  color: 'orange',
  hide_in_schedules: artist.content.hide_in_schedules || false,
}))

// Schedules
const { data: scheduleData } = await useAsyncData(
  'schedules',
  async () => {
    if (!props.blok.schedules.length) return []
    return await storyblokApi.get(`cdn/stories`, {
      version,
      by_uuids_ordered: props.blok.schedules.join(','),
      excluding_fields: 'header,seo_title,seo_description,seo_picture',
      per_page: 100,
    })
  }, {
    dedupe: 'defer',
    getCachedData: (key, nuxtApp) => {
      const cachedContent = useState('schedules')
      return cachedContent.value
      ? cachedContent.value
      : nuxtApp.payload.data[key]
    }
  }
)

const schedules = scheduleData.value.hasOwnProperty('data') ? scheduleData.value.data.stories : []
const scheduleEvents = []

// Filters
const filters = [
  { type: 'concert', title: 'Stage', color: 'red' }
]

// Merge pro schedules
schedules.forEach(schedule => {
  filters.push({
    type: schedule.uuid,
    title: tr(schedule.content, 'title'),
    color: schedule.content.color
  })
  schedule.content.schedule.forEach(event => {
    scheduleEvents.push({
      id: event._uid,
      date: event.date,
      time: event.time,
      title: tr(event, 'title'),
      stage: event.stage,
      description: tr(event, 'description'),
      type: schedule.uuid,
      color: schedule.content.color,
      hide_in_schedules: false
    })
  })
})

// Merge all events
const allEvents = concerts.concat(scheduleEvents)
const sortedEvents = allEvents.sort((a, b) => new Date(a.date) - new Date(b.date))

// Hide dates if repeated
const scheduleDate = (date) => {
  const groupedDate = new Date(date)
  groupedDate.setHours(groupedDate.getHours() - 5)
  return groupedDate
}

const firstInstanceOfDate = (date, index) => {
  if (index === 0) return true
  const previousDate = sortedEvents[index - 1].date
  return shortDate(scheduleDate(date)) !== shortDate(scheduleDate(previousDate))
}
</script>

<template>
  <div v-editable="blok" class="pro-schedule">
    <div v-if="backgroundStyle" class="background background-black z-1">
      <div class="background-holder">
        <div class="page-background with-overlay" :style="backgroundStyle" />
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
            {{ longDate(scheduleDate(event.date)) }}
          </h2>
          <LegosEvent
            v-if="!event.hide_in_schedules"
            :event="event"
            :stages="stagesByUuid"
            :class="`color-${event.color}`"
          />
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