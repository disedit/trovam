<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    :class="[
      'container',
      `bg-color-${blok.background}`,
      {
        padded: blok.padded,
        gap: blok.gap,
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

  &.gap {
    display: flex;
    flex-direction: column;
    gap: var(--site-padding);
  }
}
</style>