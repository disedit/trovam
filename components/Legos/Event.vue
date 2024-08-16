<script setup>
const props = defineProps({
  event: Object,
  stages: Object
})

const { time } = useDate()
const stage = props.stages[props.event.stage]

const hasDescription = props.event.description.content[0]?.content
</script>

<template>
  <article class="event focus-black">
    <time :datetime="event.date" class="event-time">
      <template v-if="event.time">
        <span v-for="row in event.time.split('-')">
          {{ row }}
        </span>
      </template>
      <template v-else>
        {{ time(event.date) }}
      </template>
    </time>
    <div class="event-info">
      <h3 class="event-title compensate">
        <NuxtLink v-if="event.link" :to="`/${event.link}`">
          {{ event.title }}
        </NuxtLink>
        <span v-else>
          {{ event.title }}
        </span>
      </h3>
      <LegosStage
        v-if="event.stage"
        :stage="stage.content"
        stage-only
        class="event-location compensate"
      />
      <UtilsRichText
        v-if="hasDescription"
        :content="event.description"
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

    a {
      color: var(--black);

      &:hover {
        text-decoration: underline;
        color: var(--color);
      }
    }
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