<script setup>
defineProps({
  block: { type: Boolean, default: false },
  color: { type: String, default: 'red' },
  rounded: { type: Boolean, default: false },
  size: { type: String, default: 'md' },
  variant: { type: String, default: 'default' },
})
</script>

<template>
  <NuxtLink v-bind="$attrs" :class="['button', `color-${color}`, `size-${size}`, `variant-${variant}`, { block, rounded }]">
    <span class="icon">
      <slot name="icon-prepend" />
    </span>
    <span class="compensate">
      <slot />
    </span>
    <span class="icon ms-auto">
      <slot name="icon-append" />
    </span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.button {
  background: var(--color);
  color: var(--black);
  font-weight: bold;
  display: inline-flex;
  gap: .5em;
  font-size: var(--button-text-size, var(--text-md));
  align-items: center;
  padding: .5em .75em;

  .icon :deep(svg) {
    height: 1em;
    width: auto;
    color: currentColor;
  }

  &:hover {
    background: var(--white);
    color: var(--color);
  }

  &:active {
    background: var(--black);
    color: var(--color);
  }

  &.block {
    display: flex;
    width: 100%;
  }

  &.rounded {
    border-radius: 3em;
  }

  &.size-sm {
    --button-text-size: var(--text-base);
  }

  &.variant-negative:hover {
    background: var(--black);
    color: var(--white);
  }
}
</style>