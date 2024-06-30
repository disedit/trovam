<script setup>
defineProps({
  videoId: { type: String, required: true },
  aspect: { type: String, default: '16 / 9' }
})

const isLoaded = ref(false)
</script>

<template>
  <div class="video-player relative" :style="{ '--aspect': aspect }">
    <div class="video-disclaimer color-yellow accent-links z-10" v-if="!isLoaded">
      {{ $t('video.policy') }}
      <a href="https://policies.google.com/privacy" target="_blank">
        {{ $t('video.vimeo_policy') }}
      </a>
    </div>
    <ScriptVimeoPlayer
      class="video-player-embed"
      :id="videoId"
      @ready="isLoaded = true"
    >
      <template #placeholder="{ placeholder }">
        <img
          :src="placeholder"
          alt="Video placeholder, click to play"
          class="youtube-thumbnail"
        />
      </template>
      <template #awaitingLoad>
        <div class="absolute inset-0 youtube-overlay">
          <Icon name="fa6-brands:vimeo" class="icon" />  
        </div>
      </template>
    </ScriptVimeoPlayer>
  </div>
</template>

<style lang="scss" scoped>
.video {
  &-player-embed {
    width: 100% !important;
    aspect-ratio: var(--aspect) !important;
  }

  &-thumbnail {
    aspect-ratio: var(--aspect);
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: var(--white);
    background: rgba($black, .5);
    transition: .25s ease;

    .icon {
      font-size: 5rem;
      transition: .25s ease;
    }

    &:hover {
      background: rgba($black, .75);

      .icon {
        color: var(--yellow);
        scale: 1.15;
      }
    }
  }

  &-disclaimer {
    position: absolute;
    bottom: 0;
    left: 0;
    font-weight: bold;
    font-size: var(--text-sm);
    color: var(--white);
    padding: var(--site-padding);
  }
}
</style>