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
const allowHover = ref(false)

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

/* Prefetch backgrounds */
useHead({
  link: artists.value?.data?.stories?.map(artist => {
    const background = artist.content.background.filename || artist.content.picture.filename
    const imgUrl = img(background, { width: 1500 })
    return { rel: 'prefetch', as: 'image', href: imgUrl }
  })
})

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

function leaveCard () {
  $gsap.to('artist-card', {
    opacity: 0,
    y: '-20%',
    rotate: `${random(-5, 5)}deg`,
    duration: .5,
    ease: "steps(3)",
  })
}

onMounted(() => {
  const mm = $gsap.matchMedia()
  mm.add("(max-width: 768px)", () => {
    const artistCards = document.querySelectorAll('.artists .artist')
    artistCards.forEach(card => {
      $gsap.to(card, {
        opacity: 1,
        y: (i, el) => getComputedStyle(el).getPropertyValue('--to-y'),
        x: (i, el) => getComputedStyle(el).getPropertyValue('--to-x'),
        rotate: (i, el) => getComputedStyle(el).getPropertyValue('--to-rotate'),
        duration: .25,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%'
        }
      })
    })
  })

  mm.add("(min-width: 768px)", () => {
    $gsap.fromTo('.artists .artist', {
      opacity: 0,
      y: (i, el) => getComputedStyle(el).getPropertyValue('--from-y'),
      x: (i, el) => getComputedStyle(el).getPropertyValue('--from-x'),
      rotate: (i, el) => getComputedStyle(el).getPropertyValue('--from-rotate'),
    }, {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      ease: "steps(3)",
      stagger: .1,
      duration: .5,
      onComplete: () => allowHover.value = true
    })
  })
})
</script>

<template>
  <div v-editable="blok" class="artists">
    <div class="background z-1">
      <div class="background-holder">
        <div class="page-background" :style="backgroundStyle" />
        <template v-for="artist in artists.data.stories" :key="artist.uuid">
          <Transition name="fade">
            <div 
              :key="`background-${artist.uuid}`"
              v-if="hovering?.uuid === artist.uuid && artist.content?.picture?.filename"
              class="page-background grayscale"
              :style="artistBackground(artist.content.background.filename || artist.content.picture.filename)"
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
      <section :class="['artists-list', { hovering: !!hovering && allowHover }]">
        <template v-for="(artist, i) in artists.data.stories" :key="artist.uuid">
          <NuxtLink
            :to="`/${artist.full_slug}`"
            :class="[
              'artist relative font-heavy',
              { hovering: hovering?.uuid === artist.uuid && allowHover },
            ]"
            :style="{
              '--from-x': `${random(-30, 30)}%`,
              '--from-y': `${random(-30, 30)}%`,
              '--from-rotate': `${random(-15, 15)}deg`,
              '--to-x': `${random(-10, 10)}%`,
              '--to-y': `${random(-2, 2)}%`,
              '--to-rotate': `${random(-7, 7)}deg`,
            }"
            @mouseenter="hovering = artist"
            @mouseleave="hovering = null"
            @click="leaveCard"
          >
            <UtilsNoisyPhoto
              v-if="artist.content.picture?.filename"
              :src="artist.content.picture.filename"
              :alt="artist.content.picture.alt || `Foto de ${artist.content.name}`"
              class="artist-picture md:!hidden"
              sizes="100vw md:800px"
            />
            <h2 class="compensate">{{ artist.content.name }}</h2>
          </NuxtLink>
          <div :class="['shape hidden md:block', `color-${rebus[i]?.color}`]">
            <ShapesArtists :shape="rebus[i]?.shape" preserveAspectRatio="none" />
          </div>
        </template>
      </section>
    </div>
    <div class="hidden md:block">
      <template v-for="artist in artists.data.stories" :key="`card-${artist.uuid}`">
        <Transition
          @before-enter="beforeEnter"
          @enter="onEnter"
          @leave="onLeave"
        >
          <article
            v-if="hovering?.uuid === artist.uuid && allowHover"
            class="artist-card polaroid"
            :style="{
              '--top': `calc(${random(60,90)}vh - var(--card-height))`,
              '--left': `calc(${random(40,90)}vw - var(--card-width))`,
              '--rotate': `${random(-5, 5)}deg`
            }"
          >
            <div class="artist-card-picture">
              <UtilsNoisyPhoto
                v-if="artist.content.picture?.filename"
                :src="artist.content.picture.filename"
                :alt="`Foto de ${artist.content.name}`"
                sizes="100vw md:800px"
              />
            </div>
            <div class="artist-card-name">
              {{ artist.content.name }}
            </div>
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
    margin: 2rem 0 calc(5rem + 20vh);
  }
}

.artist {
  color: var(--white);
  line-height: 1;
  text-align: center;
  opacity: 0;

  .compensate {
    transition: opacity .25s ease;
  }

  &-card {
    --card-width: 22vw;
    --card-height: 27vw;
    position: fixed;
    top: var(--top);
    left: var(--left);
    z-index: 20000;
    pointer-events: none;
    rotate: var(--rotate, -3deg);
    width: var(--card-width);
    min-height: var(--card-height);
    color: var(--black);
    font-size: var(--text-lg);
    font-family: var(--font-base);
    font-weight: bold;
    line-height: 1;

    &-picture {
      background: var(--black);
      filter: saturate(1.15);

      :deep(img) {
        aspect-ratio: 1;
      }
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

@media (hover: none) {
  .artists-card {
    display: none;
  }
}

@include media('>=md') {
  .hovering {
  .artist:not(.hovering) .compensate, .shape {
      opacity: .1;
    }
  }
}

@include media('<md') {
  .artists {
    &-title {
      margin-top: 0;
    }
  }

  .artist {
    display: flex;
    flex-direction: column;
    background: var(--white);
    color: var(--black);
    width: 90%;
    padding: var(--site-padding);
    gap: var(--site-padding);
    transform: translate(var(--from-x, var(--from-y))) rotate(var(--from-rotate));
    opacity: 0;
    box-shadow: var(--card-shadow);
    font-size: var(--text-xl);

    &-picture {
      :deep(img) {
        aspect-ratio: 1;
      }
    }
  }
}
</style>