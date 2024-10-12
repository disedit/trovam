<script setup>
const props = defineProps({
  event: Object,
  stages: Object
})

const { time } = useDate()
const { internalLink } = useLinks()
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
        <span v-if="event.concert_with">
          <span v-for="coartist in event.concert_with" :key="coartist.id">
            +
            <NuxtLink :to="internalLink(coartist.full_slug)">
              {{ coartist.content.name }}
            </NuxtLink>
          </span>
        </span>
      </h3>
      <div class="event-meta">
        <LegosStage
          v-if="event.stage"
          :stage="stage.content"
          class="event-location compensate"
        />
        <span v-else-if="event.stage_other" class="event-location compensate">
          <span>{{ event.stage_other }}</span>
          <span v-if="event.stage_other_subline" class="stage-venue">
            {{ event.stage_other_subline }}
          </span>
        </span>
        <UtilsButton
          v-if="event.cta_url"
          :to="event.cta_url"
          icon="f7:tickets"
          target="_blank"
          rel="noopener"
          class="event-button"
        >
          {{ event.cta_label || $t('artists.tickets') }}
        </UtilsButton>
      </div>
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

  &-meta {
    display: flex;
    gap: var(--spacer-4);
    align-items: center;
    align-self: center;
  }

  &-location {
    color: var(--black);
    text-align: right;
    font-family: var(--font-heavy);
    text-transform: uppercase;
    padding-top: .25em;
    margin-top: -.5em;

    :deep(.stage-venue) {
      text-transform: unset;
    }

    .stage-venue {
      display: block;
      font-weight: bold;
      font-size: .85em;
    }
  }
}

a.event-location {
  &:hover,
  &:focus {
    background: var(--color);
  }
}

@include media('<md') {
  .event {
    --card-padding: var(--spacer-3);
    grid-template-columns: 4.25rem 1fr;

    &-title {
      top: -0.1em;
    }

    &-time {
      font-size: var(--text-base);
    }

    &-info {
      grid-template-columns: 1fr;
    }

    &-description {
      grid-column: 1;
      margin-top: 0;
      border-top-width: 1px;
      font-size: var(--text-sm);
    }

    &-meta {
      flex-direction: column;
    }

    &-location {
      align-self: flex-start;
      font-family: var(--font-base);
      border-top: 1px var(--black) solid;
      width: 100%;
      text-align: left;
      margin-top: -.5em;
      padding-top: .75em;

      &:hover {
        background-color: transparent;
      }
    }

    &-button {
      width: 100%;
      justify-content: space-between;
    }
  }
}
</style>