<script setup>
const props = defineProps({ blok: Object })

/* Load relations */
const { locale } = useI18n()
const version = useEnvironment()
const storyblokApi = useStoryblokApi()
const { data: venues } = await useAsyncData(
  'venues_' + props.blok._uid,
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    by_uuids_ordered: props.blok.venues.join(',')
  })
)
</script>

<template>
  <section
    v-editable="blok"
    class="venues-index"
    aria-label="Espais"
  >
    <div class="container padded">
      <article
        v-for="venue in venues"
        :key="venue.id"
        :class="['venue']"
      >
        <pre>{{venue}}</pre>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.block-menu {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
  background: var(--black);
  border-top: 3px solid var(--black);
  border-bottom: 3px solid var(--black);

  &-item {
    display: flex;
    background: var(--color);
    color: var(--black);
    padding: var(--spacer-1) var(--site-padding);
    font-size: var(--text-2xl);
    gap: .25em;
    align-items: center;

    svg {
      height: 1em;
    }

    &:hover {
      background: var(--white);

      svg {
        color: var(--color);
      }
    }
  }
}

@include media('<md') {
  .block-menu {
    grid-template-columns: 1fr;
  }
}
</style>
