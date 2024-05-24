<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    :class="[
      'container',
      `bg-${blok.background}`,
      {
        padded: blok.padded,
        'container-sm': blok.small_container
      }
    ]"
  >
    <StoryblokComponent
      v-for="blok in blok.blocks"
      :blok="blok"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: var(--bg-color);
  color: var(--text-color);
}
</style>