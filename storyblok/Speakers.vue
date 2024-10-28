<script setup>
const props = defineProps({ blok: Object })

const filter = props.blok?.path
  ? { starts_with: props.blok.path, is_startpage: false }
  : { by_uuids_ordered: props.blok?.speakers?.join(',') }

const storyblokApi = useStoryblokApi()
const { locale } = useI18n()
const version = useEnvironment()
const { data: speakers } = await useAsyncData(
  'speakers_' + props.blok?._uid,
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    ...filter
  })
)

const { $gsap } = useNuxtApp()
onMounted(() => {
  const speakerCards = document.querySelectorAll('.speakers .speaker')
  speakerCards.forEach((card, index) => {
    $gsap.fromTo(card, {
        opacity: 0,
        y: 200,
      },{
        opacity: 1,
        y: 0,
        duration: .25,
        delay: index / 20,
        scrollTrigger: {
          trigger: card,
          stagger: 0.1,
          start: 'top 90%'
        }
    })
  })
})
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
  grid-auto-rows: 400px auto auto;
}

@include media('<md') {
  .speakers {
    grid-auto-rows: 300px auto auto;
  }
}
</style>