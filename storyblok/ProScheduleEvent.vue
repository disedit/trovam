<script setup>
const props = defineProps({
  blok: Object,
  stages: Object
})

const { time } = useDate()
const stage = props.stages[props.blok.stage]

const hasDescription = props.blok.description.content[0]?.content
</script>

<template>
  <article v-editable="blok" class="event focus-black">
    <time :datetime="blok.date" class="event-time">
      <template v-if="blok.time">
        <span v-for="row in blok.time.split('-')">
          {{ row }}
        </span>
      </template>
      <template v-else>
        {{ time(blok.date) }}
      </template>
    </time>
    <div class="event-info">
      <h3 class="event-title compensate">
        {{ blok.title }}
      </h3>
      <LegosStage
        v-if="blok.stage"
        :stage="stage.content"
        stage-only
        class="event-location compensate"
      />
      <UtilsRichText
        v-if="hasDescription"
        :content="blok.description"
        class="event-description"
      />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.event {
  --card-padding: var(--spacer-4);
  display: grid;
  grid-template-columns: 110px 1fr;

  &-info {
    display: grid;
    color: var(--black);
    background: var(--white);
    padding: var(--card-padding);
    grid-template-columns: 1fr auto;
    gap: var(--spacer-4);
  }

  &-time {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background: var(--color);
    color: var(--black);
    padding: var(--card-padding);
    font-size: var(--text-md);
    font-weight: bold;
  }

  &-title {
    font-size: var(--text-md);
    font-weight: bold;
  }

  &-description {
    font-size: var(--text-base);
    border-top: 2px var(--black) solid;
    padding-top: .75rem;
    grid-column: span 2;
    margin-top: -.5rem;
  }

  &-location {
    color: var(--black);
    text-align: right;
    font-family: var(--font-heavy);
    text-transform: uppercase;
    align-self: center;
    padding-top: .25em;
    margin-top: -.25em;

    &:hover,
    &:focus {
      background: var(--color);
    }
  }
}
</style>