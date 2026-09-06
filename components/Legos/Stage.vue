<script setup>
const props = defineProps({
  stage: {
    type: Object,
    required: true
  },
  stageOnly: {
    type: Boolean,
    default: false
  }
})

const { internalLink } = useLinks()
const { tr } = useTranslated()
const venue = computed(() => props.stage.venue[0]?.content)
</script>

<template>
  <NuxtLink :to="internalLink(`/${stage.venue[0].full_slug || '/la-fira/espais'}`)" class="stage">
    <span>
      {{ tr(stage, 'short_name') || tr(stage, 'name') }}
    </span>
    <span v-if="venue && tr(stage, 'name') !== tr(venue, 'name') && !stageOnly" class="stage-venue">
      {{ tr(venue, 'name') }}
    </span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.stage {
  &-venue {
    display: block;
    font-weight: bold;
    font-size: .85em;
  }
}
</style>