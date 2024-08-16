<script setup>
const props = defineProps({ blok: Object })

// Background image
const img = useImage()
const backgroundStyle = computed(() => {
  if (!props.blok.background?.filename) return false
  const imgUrl = img(props.blok.background.filename, { width: 1500 })
  return { backgroundImage: `url('${imgUrl}')` }
})

// Events
const { longDate, shortDate } = useDate()
const stageUuids = props.blok.schedule.map(event => event.stage)
const storyblokApi = useStoryblokApi()
const { locale } = useI18n()
const version = useEnvironment()
const { data: stages } = await useAsyncData(
  'stages_' + props.blok._uid,
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    by_uuids: stageUuids.join(','),
    resolve_relations: 'Stage.venue',
    excluding_fields: 'map,address,stages,picture,highlight'
  })
)
const stagesByUuid = Object.fromEntries(stages.value.data.stories.map(stage => [stage.uuid, stage]))

// Hide dates if repeated
const firstInstanceOfDate = (date, index) => {
  if (index === 0) return true
  const previousDate = props.blok.schedule[index - 1].date
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
      <div :class="['container container-sm padded pro-schedule-events', `color-${blok.color}`]">
        <template v-for="(blok, i) in blok.schedule" :key="blok._uid">
          <h2 v-if="firstInstanceOfDate(blok.date, i)" class="pro-schedule-date">
            {{ longDate(blok.date) }}
          </h2>
          <StoryblokComponent
            :blok="blok"
            :stages="stagesByUuid"
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
  padding-bottom: 20rem;
}

.pro-schedule-date {
  font-weight: 900;
  font-size: var(--text-lg);
  margin-top: var(--spacer-8);
}
</style>