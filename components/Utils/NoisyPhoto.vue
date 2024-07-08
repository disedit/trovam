<script setup>
const loaded = ref(false)
</script>

<template>
  <div :class="['noisy-photo', { loaded }]">
    <NuxtImg v-bind="{ ...$attrs, class: undefined }" @load="loaded = true" />
  </div>
</template>

<style lang="scss" scoped>
.noisy-photo {
  display: flex;
  position: relative;

  img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: .5s ease;
  }

  &.loaded img {
    opacity: 1;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    filter: contrast(150%) brightness(.75);
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    mix-blend-mode: multiply;
    z-index: 10;
    opacity: .5;
  }
}
</style>