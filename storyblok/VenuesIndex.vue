<script setup>
const props = defineProps({ blok: Object })
const { random } = useUtils()

/* Load relations */
const { locale } = useI18n()
const version = useEnvironment()
const storyblokApi = useStoryblokApi()
const { data: venues } = await useAsyncData(
  'venues_' + props.blok._uid,
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    by_uuids_ordered: props.blok.venues.join(','),
    resolve_relations: 'Venue.stages',
    excluding_fields: 'map',
  })
)

const rotate = useState(`venues-rotate`, () => {
  return venues.value.data.stories.map(() => random(-3, 3))
})
</script>

<template>
  <section
    v-editable="blok"
    class="venues-index"
    aria-label="Espais"
  >
    <div class="container container-sm mx-auto padded grid md:grid-cols-2 gap-padding">
      <article
        v-for="(venue, v) in venues.data.stories"
        :key="venue.uuid"
        :class="['venue', { 'highlight md:col-span-2': venue.content.highlight }]"
        :style="{
          '--rotate': `${rotate[v]}deg`
        }"
      >
        <NuxtLink :to="`/${venue.full_slug}`">
          <div v-if="venue.content.picture?.filename" class="venue-picture">
            <NuxtImg
              :src="venue.content.picture.filename"
              :alt="`Foto de ${venue.content.name}`"
              sizes="100vw md:800px"
            />
          </div>
          <h2>{{ venue.content.name }}</h2>
          <LegosStageList class="mt-auto" :stages="venue.content.stages" />
        </NuxtLink>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.venue {
  display: flex;

  a {
    display: flex;
    flex-direction: column;
    color: var(--black);
    gap: var(--spacer-4);
    padding: var(--spacer-4);
    background: var(--white);
    flex-grow: 1;
    transition: .25s ease;

    &:hover {
      transform: scale(1.05) translateY(-2%) rotate(var(--rotate, -2deg));
      box-shadow: var(--card-shadow);
    }
  }

  h2 {
    font-weight: 900;
    font-size: var(--text-lg);
    line-height: 1;
  }

  &-picture {
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }
  }
}
</style>
