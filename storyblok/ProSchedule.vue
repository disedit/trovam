<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok">
    <h1>Pro Schedule</h1>
    <pre>{{ blok }}</pre>
  </div>
</template>
