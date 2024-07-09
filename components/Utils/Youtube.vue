<script setup>
defineProps({
  videoId: { type: String, required: true },
  aspect: { type: String, default: '16 / 9' }
})

const isLoaded = ref(false)
</script>

<template>
  <div class="video-player relative" :style="{ '--aspect': aspect }">
    <iframe
      width="560"
      height="315"
      :src="`https://www.youtube-nocookie.com/embed/${videoId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
  </div>
</template>

<style lang="scss" scoped>
.video-player {
  iframe {
    aspect-ratio: var(--aspect, 16/9);
    width: 100%;
    height: 100%;
  }
}
</style>