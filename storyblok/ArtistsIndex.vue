<script setup>
const props = defineProps({ blok: Object })
const { locale } = useI18n()
const version = useEnvironment()
const { slug } = useRoute().params
const storyblokApi = useStoryblokApi()

const orderedArtists = {
  by_uuids_ordered: props.blok.ordered_artists.join(',')
}

const autopopulate = {
  starts_with: props.path || `${slug[0]}/artistes/`,
  sort_by: 'content.name:asc',
  is_startpage: false
}

const filter = props.blok.ordered_artists.length > 0 ? orderedArtists : autopopulate

const { data: artists } = await useAsyncData(
  'artists_' + props.blok._uid,
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    excluding_fields: 'cta_url,cta_label,website,description,facebook,twitter,instagram,youtube,youtube_id,vimeo_id,spotify,bandcamp,soundcloud',
    resolve_relations: 'Artist.venue',
    ...filter
  })
)

/* Selected artist */
const hovering = ref(null)

/* Background */
const img = useImage()
const backgroundStyle = computed(() => {
  if (!props.blok.background?.filename) return false
  const imgUrl = img(props.blok.background.filename, { width: 1500 })
  return { backgroundImage: `url('${imgUrl}')` }
})

function artistBackground(filename) {
  const imgUrl = img(filename, { width: 1500 })
  return { backgroundImage: `url('${imgUrl}')` }
}

/* Artist list effects */
const { random } = useUtils()
const artistsTotal = computed(() => artists.value?.data?.stories?.length)
const colors = ['yellow', 'red', 'green', 'pink', 'blue']
const rebus = computed(() => {
  const shapes = []
  const totalShapes = 12
  let shape = 1
  let color = 0
  for(let i = 0; i <= artistsTotal.value; i++) {
    shapes.push({ shape: `Artists${shape}`, color: colors[color] })
    shape = (shape === totalShapes) ? 1 : shape + 1
    color = (color === colors.length - 1) ? 0 : color + 1
  }
  return shapes
})

/* Animations */
const { $gsap } = useNuxtApp()

function beforeEnter(el) {
  $gsap.set(el, {
    opacity: 0,
    y: '20%',
    rotate: `${random(-5, 5)}deg`,
  })
}

function onEnter(el, done) {
  $gsap.to(el, {
    opacity: 1,
    y: 0,
    rotate: `${random(-5, 5)}deg`,
    duration: .5,
    ease: "steps(3)",
    onComplete: done
  })
}

function onLeave (el, done) {
  $gsap.to(el, {
    opacity: 0,
    y: '-20%',
    rotate: `${random(-5, 5)}deg`,
    duration: .5,
    ease: "steps(3)",
    onComplete: done
  })
}
</script>

<template>
  <div v-editable="blok" class="artists">
    <div class="background z-1">
      <div class="background-holder">
        <div class="generic-background" :style="backgroundStyle" />
        <template v-for="(artist, i) in artists.data.stories" :key="artist.uuid">
          <Transition name="fade">
            <div 
              :key="`background-${artist.uuid}`"
              v-if="hovering?.uuid === artist.uuid && artist.content?.picture?.filename"
              class="artist-background"
              :style="artistBackground(artist.content.picture.filename)"
            />
          </Transition>
        </template>
      </div>
    </div>
    <div class="container padded relative navbar-safest-area z-10 -mt-[100vh]">
      <h1 class="artists-title">
        <ShapesShape1 />
        <span class="compensate">Live / {{ blok.title }}</span>
      </h1>
      <section :class="['artists-list', { hovering: !!hovering }]">
        <template v-for="(artist, i) in artists.data.stories" :key="artist.uuid">
          <NuxtLink
            :to="`/${artist.full_slug}`"
            :class="['artist relative font-heavy', { hovering: hovering?.uuid === artist.uuid }]"
            @mouseenter="hovering = artist"
            @mouseleave="hovering = null"
          >
            <h2 class="compensate">{{ artist.content.name }}</h2>
          </NuxtLink>
          <div :class="['shape', `color-${rebus[i]?.color}`]">
            <ShapesArtists :shape="rebus[i]?.shape" preserveAspectRatio="none" />
          </div>
        </template>
      </section>
    </div>
    <div class="artist-corkboard">
      <template v-for="artist in artists.data.stories" :key="`card-${artist.uuid}`">
        <Transition
          @before-enter="beforeEnter"
          @enter="onEnter"
          @leave="onLeave"
        >
          <article
            v-if="hovering?.uuid === artist.uuid"
            class="artist-card polaroid"
            :style="{
              '--top': `calc(${random(60,90)}vh - var(--card-height))`,
              '--left': `calc(${random(40,90)}vw - var(--card-width))`,
              '--rotate': `${random(-5, 5)}deg`
            }"
          >
            <NuxtImg
              v-if="artist.content.picture?.filename"
              :src="artist.content.picture.filename"
              :alt="`Foto de ${artist.content.name}`" />
              {{ artist.content.name }}
          </article>
        </Transition>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.artists {
  min-height: 100vh;
  overflow: clip;

  &-title {
    display: flex;
    gap: .5em;
    justify-content: center;
    align-items: center;
    font-size: var(--text-md);
    margin-top: calc(4rem + 10vh);
    font-weight: 900;

    svg {
      height: 1em;
      color: var(--red);
    }
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-size: var(--text-2xl);
    gap: .5em;
    margin: 2rem 0 5rem;
  }
}

.artist {
  color: var(--white);
  transition: opacity .25s ease;
  line-height: 1;

  &-card {
    --card-width: 22vw;
    --card-height: 28vw;
    position: fixed;
    top: var(--top);
    left: var(--left);
    z-index: 100;
    pointer-events: none;
    rotate: var(--rotate, -3deg);
    width: var(--card-width);
    height: var(--card-height);
    color: var(--black);
    font-size: var(--text-lg);
    font-family: var(--font-base);
    font-weight: bold;
    line-height: 1;

    img {
      width: 100%;
      height: 75%;
      object-fit: cover;
    }
  }
}

.shape {
  color: var(--color);
  transition: opacity .25s ease;

  svg {
    height: .85em;
  }
}

.hovering {
  .artist:not(.hovering), .shape {
    opacity: .1;
  }
}

.background {
  position: sticky;
  inset: 0;
  pointer-events: none;
  opacity: .5;
}

.background-holder {
  position: relative;
  height: 100vh;
}

.generic-background,
.artist-background {
  position: absolute;
  inset: 0;
  background-position: top;
  background-size: cover;
  z-index: 1;
}

.artist-background {
  z-index: 2;
  filter: grayscale(1) contrast(1) brightness(.5);
}
</style>