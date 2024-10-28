<template>
  <div class="speaker">
    <div class="speaker-picture">
      <NuxtImg
        v-if="speaker.content?.picture?.filename"
        :src="speaker.content.picture.filename"
        width="500"
        class="speaker-picture"
      />
    </div>
    <h3 class="speaker-name">{{ speaker.content.name }}</h3>
    <UtilsRichText
      v-if="speaker.content?.description"
      :content="speaker.content.description"
      class="speaker-description"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  speaker: { type: Object, required: true }
})
</script>

<style lang="scss" scoped>
.speaker {
  background: var(--white);
  color: var(--black);
  padding: var(--spacer-4);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: subgrid;
  grid-row: span 3;
  gap: var(--spacer-4);
  opacity: 0;

  &-picture {
    display: flex;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &-name {
    font-weight: bold;
    font-size: var(--text-lg);
  }

  &-description {
    font-size: var(--text-base);
  }
}
</style>