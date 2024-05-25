<script setup>
defineProps({ blok: Object })
</script>

<template>
  <article
    v-editable="blok"
    :class="['card p-site', `bg-color-${blok.background}`, {'gap-padding': blok.gap}]"
  >
    <StoryblokComponent
      v-for="blok in blok.blocks"
      :key="blok._uid"
      :blok="blok"
    />
  </article>
</template>

<style lang="scss" scoped>
.card {
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
}
</style>
