<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    class="embed"
    v-html="blok.html"
  />
  <div
    v-if="blok.styles"
    v-html="blok.styles"
  />
</template>

