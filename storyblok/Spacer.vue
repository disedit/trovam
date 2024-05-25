<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    :class="['spacer', { 'full-height': blok.full_height }]"
    :style="{
      '--padding-y': `var(--spacer-${blok.padding_y})`,
      '--height': blok.height
    }"
  >
    <StoryblokComponent
      v-for="blok in blok.blocks"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<style lang="scss" scoped>
.spacer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: var(--padding-y);
  height: var(--height, auto);

  &.full-height {
    height: 100vh;
    height: 100svh;
  }
}
</style>