<script setup>
defineProps({ blok: Object })
</script>

<template>
  <NuxtLink 
    v-if="blok.link.linktype === 'story'"
    :class="['cta', `color-${blok.color}`, `text-${blok.size}`]"
    :to="blok.link.linktype === 'story' ? `/${blok.link.cached_url}` : null"
  >
    <ShapesGate v-if="blok.shape" :shape="blok.shape" />
    <span class="compensate">{{ blok.label }}</span>
  </NuxtLink>
  <a
    v-else
    :href="blok.link.linktype === 'url' ? blok.link.cached_url : null"
    :class="['cta', `color-${blok.color}`, `text-${blok.size}`]"
  >
    <ShapesGate v-if="blok.shape" :shape="blok.shape" />
    <span class="compensate">{{ blok.label }}</span>
  </a>
</template>

<style lang="scss" scoped>
.cta {
  display: flex;
  background-color: var(--color);
  color: inherit;
  border-radius: 10rem;
  font-weight: bold;
  padding: .25em .75em;
  gap: .25em;
  align-items: center;

  &.color-black {
    color: var(--white);
  }

  &:hover {
    background: var(--black);
    color: var(--white);
  }

  svg {
    height: 1em;
    width: 1em;
    flex-shrink: 0;
  }
}
</style>