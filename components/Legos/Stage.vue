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

const venue = computed(() => props.stage.venue[0].content)
</script>

<template>
  <NuxtLink :to="`/${stage.venue[0].full_slug}`" class="stage">
    {{ stage.short_name || stage.name }}
    <span v-if="stage.name !== venue.name && !stageOnly" class="stage-venue">
      {{ venue.name }}
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