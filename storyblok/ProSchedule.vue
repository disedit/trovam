<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok">
    <h1>Pro Schedule</h1>
    <StoryblokComponent
      v-for="blok in blok.schedule"
      :key="blok._uid"
      :blok="blok" />
  </div>
</template>
