<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok" class="youtube-embed">
    <UtilsYoutube :video-id="blok.youtube_id" :aspect="blok.aspect" />
  </div>
</template>
