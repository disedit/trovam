<script lang="ts" setup>
const props = defineProps({ blok: Object })
const showTicketsArrow = ref(false)
const { shortDate, time } = useDate()
</script>

<template>
  <div v-if="blok.concert_date" class="artist-concert">
    <div class="sticky top-navbar-plus">
      <div class="artist-concert-date" v-if="blok.concert_date">
        <span>{{ shortDate(blok.concert_date) }}</span>
        <span>{{ blok.time_override || time(blok.concert_date) }}</span>
      </div>

      <LegosStage v-if="blok.stage" :stage="blok.stage.content" class="artist-concert-stage" />

      <a v-if="blok.cta_url" :href="blok.cta_url" target="_blank" class="artist-concert-tickets" @mouseenter="showTicketsArrow = true" @mouseleave="showTicketsArrow = false">
        <span class="compensate">{{ blok.cta_label || $t('artists.tickets') }}</span>
        
        <Transition name="fade-right" mode="out-in">
          <Icon name="material-symbols:arrow-forward" v-if="showTicketsArrow" class="arrow" key="arrow" />
          <Icon name="f7:tickets" v-else key="tickets" />
        </Transition>
      </a>

      <UtilsRichText v-if="blok.concert_info" :content="blok.concert_info" class="artist-concert-info" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.artist {
  &-concert {
    flex-grow: 1;

    .sticky {
      display: flex;
      flex-direction: column;
      gap: var(--card-padding);
      font-size: var(--text-md);
    }

    &-date {
      font-size: var(--text-xl);
      font-weight: bold;
      display: flex;
      gap: var(--card-padding);
      justify-content: space-between;
    }

    &-stage {
      display: block;
      border: 3px var(--white) solid;
      padding: .5em .5em .4em .5em;
      border-radius: 10rem;
      color: var(--white);
      text-align: center;
      transition: .25s ease;

      &:hover {
        background: var(--white);
        color: var(--black);
      }
    }

    &-tickets {
      display: flex;
      border: 3px var(--white) solid;
      padding: .5em 1.25em;
      border-radius: 10rem;
      color: var(--black);
      justify-content: space-between;
      align-items: center;
      gap: var(--spacer-2);
      background-color: var(--white);
      font-weight: bold;
      transition: .25s ease;

      &:hover {
        background: var(--red);
        color: var(--white);
        border-color: var(--red);
      }
    }

    &-info {
      &:deep(h3) {
        border-bottom: 2px var(--black) solid;
        margin-bottom: .5em;
      }
    }
  }
}
</style>