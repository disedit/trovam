<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    class="embed"
    v-html="blok.html"
  />
</template>

