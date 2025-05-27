<script lang="ts" setup>
const props = defineProps({
  speaker: { type: Object, required: true }
})

const { random } = useUtils()
const rotate = useState(`rotate-${props.speaker.uuid}`, () => random(-3, 3))
</script>

<template>
  <div class="speaker" :style="{ '--rotate': `${rotate}deg`}">
    <div class="speaker-picture">
      <NuxtImg
        v-if="speaker.content?.picture?.filename"
        :src="speaker.content.picture.filename"
        width="500"
        class="speaker-picture"
      />
    </div>
    <h3 class="speaker-name">{{ speaker.content.name }}</h3>
    <div v-if="speaker.content?.description" class="speaker-description">
      {{ speaker.content.description }}
    </div>
    <NuxtLink
      to="/2024/pro/programacio-pro"
      v-if="speaker.content?.event"
      class="speaker-event"
    >
      {{ speaker.content.event }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.speaker {
  background: var(--white);
  color: var(--black);
  padding: var(--spacer-4);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: subgrid;
  grid-row: span 4;
  gap: var(--spacer-4);
  transition: .25s ease;

  &:hover {
    transform: scale(1.05) translateY(-2%) rotate(var(--rotate, -2deg)) !important;
  }

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

  &-description,
  &-event {
    font-size: var(--text-base);
  }

  &-event {
    font-weight: bold;
    color: var(--red);

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>