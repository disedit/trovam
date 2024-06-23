<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok" class="youtube-embed" :style="{ '--aspect': blok.aspect }">
    <iframe
      width="560"
      height="315"
      :src="`https://www.youtube-nocookie.com/embed/${blok.youtube_id}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
  </div>
</template>

<style lang="scss">
.youtube-embed {
  iframe {
    aspect-ratio: var(--aspect, 16/9);
    width: 100%;
    height: 100%;
  }
}
</style>
