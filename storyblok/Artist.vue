<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok">
    <h1>Artist</h1>
    <pre>{{ blok }}</pre>
  </div>
</template>
