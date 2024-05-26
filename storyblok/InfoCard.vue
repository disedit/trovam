<script setup>
const props = defineProps({ blok: Object })
const tag = computed(() => props.blok.link?.cached_url
  ? props.blok.link.linktype === 'story'
    ? resolveComponent('NuxtLink')
      : 'a'
      : 'article'
)

function random(min, max) {
  return Math.random() * (max - min) + min
}
</script>

<template>
  <Component
    :is="tag"
    v-editable="blok"
    :class="['info-card p-site', `bg-color-${blok.background_color}`, { 'hover-effect': blok.hover_effect }]"
    :to="blok.link.linktype === 'story' ? `/${blok.link.cached_url}` : null"
    :href="blok.link.linktype === 'url' ? blok.link.cached_url : null"
    :style="{
      '--rotate': `${random(-3,3)}deg`
    }"
  >
    <h2 v-if="blok.title">{{ blok.title }}</h2>
    <p v-if="blok.text">{{ blok.text }}</p>
    <StoryblokComponent
      v-for="blok in blok.blocks"
      :key="blok.id"
      :blok="blok"
    />
  </Component>
</template>

<style lang="scss" scoped>
.info-card {
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  gap: var(--spacer-4);
  transition: .25s ease;

  &.hover-effect:hover {
    transform: scale(1.05) translateY(-2%) rotate(var(--rotate, -2deg));
    box-shadow: 0 0 30px rgba($black, .5);
  }

  h2 {
    font-family: var(--font-base);
    font-weight: bold;
    font-size: var(--text-lg);
  }

  &.bg-color-white,
  &.bg-color-yellow {
    --focus-color: var(--black);
  }
}
</style>
