<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    :class="[
      'formatted-text',
      `text-${blok.base_size}`,
      `text-${blok.base_color}`
    ]"
  >
    <UtilsRichText :content="blok.content" />
  </div>
</template>

<style lang="scss">
.formatted-text p:not(:last-child) {
  margin-block-end: var(--spacer-4);
}
</style>
