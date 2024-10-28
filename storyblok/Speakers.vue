<script setup>
const props = defineProps({ blok: Object })

const filter = props.blok?.path
  ? { starts_with: props.blok.path, is_startpage: false, sort_by: 'content.name:asc', }
  : { by_uuids_ordered: props.blok?.speakers?.join(',') }

const storyblokApi = useStoryblokApi()
const { locale } = useI18n()
const version = useEnvironment()
const { data: speakers } = await useAsyncData(
  'speakers_' + props.blok?._uid,
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    per_page: 100,
    ...filter
  })
)
</script>

<template>
  <div class="grid speakers">
    <LegosSpeaker
      v-for="speaker in speakers?.data.stories"
      :key="speaker.id"
      :speaker="speaker"
    />
  </div>
</template>

<style lang="scss" scoped>
.speakers {
  gap: var(--site-padding);
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-rows: var(--speaker-picture-height, 400px) auto auto auto;
}

@include media('<md') {
  .speakers {
    --speaker-picture-height: 300px;
  }
}
</style>