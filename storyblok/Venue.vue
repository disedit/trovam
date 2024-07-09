<script setup>
import PageHeader from './PageHeader'

const props = defineProps({ blok: Object })
const { locale } = useI18n()
const version = useEnvironment()
const storyblokApi = useStoryblokApi()

/* Load parent */
const parent = await useAsyncStoryblok(
  '/la-fira/espais',
  {
    version,
    language: locale.value
  }
)

/* Load relations */
const { data: stages } = await useAsyncData(
  'stages_' + props.blok._uid,
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    by_uuids_ordered: props.blok.stages.join(','),
  })
)

/* Background */
const img = useImage()
const backgroundStyle = computed(() => {
  if (!props.blok.picture?.filename) return false
  const imgUrl = img(props.blok.picture.filename, { width: 1500 })
  return { backgroundImage: `url('${imgUrl}')` }
})
</script>

<template>
  <div v-editable="blok" class="venue">
    <div class="background z-1">
      <div class="background-holder">
        <div class="page-background grayscale" :style="backgroundStyle" />
      </div>
    </div>
    <PageHeader
      :blok="{
        small_container: true,
        color: parent.content.body[0].color,
        shape: parent.content.body[0].shape,
        title: parent.content.body[0].title,
        link: `/${parent.full_slug}`
      }"
      class="relative z-10 -mt-[100vh]"
    />
    <div class="container container-sm padded relative z-10">
      <article class="venue-card">
        <div v-if="blok.picture?.filename" class="venue-picture">
          <NuxtImg
            :src="blok.picture.filename"
            :alt="`Foto de ${blok.name}`"
            sizes="100vw md:800px"
          />
          <h2>{{ blok.name }}</h2>
        </div>
        <div class="venue-stages my-4">
          <h3>{{ $t('venue.stages') }}</h3>
          <LegosStageList :stages="stages.data.stories" />
        </div>
        <hr />
        <div v-if="blok.address" class="venue-address my-4">
          <h3>{{ $t('venue.address') }}</h3>
          <address>{{ blok.address }}</address>
        </div>
        <div v-if="blok.map" class="venue-map" v-html="blok.map" />
      </article>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.venue {
  position: relative;

  &-card {
    background: var(--white);
    color: var(--black);
    padding: var(--site-padding);
    margin-bottom: 5rem;

    h2 {
      font-size: var(--text-xl);
      font-weight: bold;
      line-height: 1;
      position: absolute;
      top: calc(var(--spacer-4) * -1);
      left: calc(var(--spacer-4) * -1);
      background: var(--white);
      padding: var(--spacer-4);
    }
  }

  &-picture {
    position: relative;
    border-bottom: 1px var(--black) solid;

    img {
      width: 100%;
      height: 380px;
      object-fit: cover;
    }
  }

  h3 {
    font-family: var(--font-base);
    font-weight: bold;
    margin-bottom: var(--spacer-2);
  }

  hr {
    border-bottom: 1px var(--black) solid;
  }

  address {
    font-style: normal;
  }

  &-map {
    border-top: 1px var(--black) solid;
    border-bottom: 1px var(--black) solid;

    :deep(iframe) {
      width: 100%;
    }
  }

  .page-background {
    opacity: .35;
  }
}
</style>