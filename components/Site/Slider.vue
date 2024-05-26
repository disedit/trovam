<script setup>

</script>

<template>
  <div class="slider">
      <slot />
  </div>
</template>

<style lang="scss" scoped>
.slider {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--site-padding);
  overflow-x: auto;
  @include scrollbar($black, $yellow, $yellow, 3px);
  cursor: grabbing;
  scrollbar-color: var(--color) var(--yellow);
  padding-inline-start: calc(((100vw - var(--container-max-width)) / 2) + var(--site-padding));
  padding-inline-end: var(--site-padding);
  padding-block: var(--site-padding);
  user-select: none;
}
</style>