<script setup>
const props = defineProps({ blok: Object })

/* Fetch background */
const img = useImage()
const backgroundStyle = computed(() => {
  const imgUrl = img(props.blok.background_picture.filename, { width: 1000 })
  return { backgroundImage: `url('${imgUrl}')` }
})

/* Fetch posts */
const { locale } = useI18n()
const version = useEnvironment()
const storyblokApi = useStoryblokApi()
const orderedArtists = {
  by_uuids_ordered: props.blok.ordered_artists.join(',')
}
const autopopulate = {
  starts_with: props.blok.path || `2026/artistes/`,
  sort_by: 'content.name:asc',
  filter_query: {
    hide_in_artist_lists: {
      is: 'false'
    }
  },
  is_startpage: false
}

const filter = props.blok.ordered_artists.length > 0 ? orderedArtists : autopopulate

const { data: artists } = await useAsyncData(
  'artists_home',
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    excluding_fields: 'cta_url,cta_label,website,description,facebook,twitter,instagram,youtube,youtube_id,vimeo_id,spotify,bandcamp,soundcloud',
    per_page: 100,
    ...filter
  }), {
    watch: [locale],
    dedupe: 'defer',
    getCachedData: (key, nuxtApp) => {
      const cachedContent = useState('artists_home' + locale.value)
      return cachedContent.value
      ? cachedContent.value
      : nuxtApp.payload.data[key]
    }
  }
)

useHead({
  link: artists.value?.data?.stories?.map(artist => {
    const background = artist.content?.picture?.filename
    if (!background) return
    const imgUrl = img(background, { width: 1500 })
    return { rel: 'prefetch', as: 'image', href: imgUrl }
  })
})

/* Animations */
const { random } = useUtils()
const hovering = ref(null)
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
  $gsap.set('.home-artists-list .artist', { opacity: 0 })
  $gsap.set('.home-artists-title', { opacity: 0, x: '-1em' })
  $gsap.set('.home-artists-info div', { opacity: 0, x: '-1me' })

  $gsap.to('.home-artists-list .artist', {
    opacity: 1,
    duration: .25,
    stagger: .05,
  })

  $gsap.to('.home-artists-title, .home-artists-info div', {
    opacity: 1,
    duration: .75,
    x: 0,
    stagger: .25,
    delay: 1
  })
})

function artistBackground(filename) {
  const imgUrl = img(filename, { width: 1500 })
  return { backgroundImage: `url('${imgUrl}')`, backgroundPosition: 'center', backgroundSize: 'cover' }
}

// Random rotations
const positionStyles = useState(`artists-positions`, () => {
  return artists.value.data.stories.map(() => ({
    '--top': `calc(${random(60,90)}vh - var(--card-height))`,
    '--left': `calc(${random(40,90)}vw - var(--card-width))`,
    '--rotate': `${random(-5, 5)}deg`
  }))
})
</script>

<template>
  <section
    v-editable="blok"
    :class="['home-artists relative', { hovering: !!hovering }]"
    :style="backgroundStyle"
    :aria-labelledby="`title-${blok._uid}`"
  >
    <div class="background background-black z-1">
      <div class="background-holder">
        <template v-for="artist in artists?.data?.stories" :key="artist.uuid">
          <Transition name="fade">
            <div 
              :key="`background-${artist.uuid}`"
              v-if="hovering?.uuid === artist.uuid && artist.content?.picture?.filename"
              class="page-background with-overlay"
              :style="artistBackground(artist.content.background.filename || artist.content.picture.filename)"
            />
          </Transition>
        </template>
      </div>
    </div>
    <div class="container padded relative z-10 -mt-[100vh]">
      <NuxtLink :to="`/${blok.path}`" class="dim-on-hover">
        <h2 :id="`title-${blok._uid}`" class="home-artists-title">
          <span class="compensate">{{ blok.title }}</span>
        </h2>
      </NuxtLink>
      <div class="hidden md:block">
        <div class="home-artists-list">
          <NuxtLink
            v-for="artist in artists?.data?.stories" :key="artist.slug"
            :to="`/${artist.full_slug}`"
            @mouseenter="hovering = artist"
            @mouseleave="hovering = null"
            @click="leaveCard"
            :class="[
              'artist relative whitespace-nowrap',
              { hovering: hovering?.uuid === artist.uuid },
            ]"
          >
            <span>{{ artist.content.name }}</span>
          </NuxtLink>
        </div>
      </div>
      <NuxtLink
        :to="`/${blok.path}`"
        class="home-artists-list md:hidden"
      >
        <span v-for="artist in artists?.data?.stories" :key="artist.slug" class="artist whitespace-nowrap">
          {{ artist.content.name }}
        </span>
      </NuxtLink>
      <div class="hidden md:block">
        <template v-for="(artist, i) in artists.data.stories" :key="`card-${artist.uuid}`">
          <Transition
            @before-enter="beforeEnter"
            @enter="onEnter"
            @leave="onLeave"
          >
            <article
              v-if="hovering?.uuid === artist.uuid"
              class="artist-card polaroid"
              :style="positionStyles[i]"
            >
              <div class="artist-card-picture grayscale">
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

      <div :class="['home-artists-info dim-on-hover', { 'hovering': !!hovering }]">
        <div class="home-artists-dates">
          {{ blok.dates }}
        </div>
        <div class="home-artists-location">
          <span>{{ blok.edition }}</span>
          {{ blok.city }}
        </div>
      </div>
    </div>

    <div v-html="blok.html" />
    <video src="/video/trovam.mp4" autoplay muted loop playsinline class="absolute mix-blend-lighten inset-0 w-full h-full object-contain z-0 opacity-50 pointer-events-none"></video>
  </section>
</template>

<style lang="scss" scoped>
.home-artists {
  --illustration-width: 18vw;
  position: relative;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-color: var(--black);
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: clip;

  &-title {
    display: flex;
    font-weight: bold;
    font-size: var(--text-base);
    align-items: center;
    justify-content: center;
    gap: .25em;
    margin-bottom: var(--spacer-4);
    opacity: 0;

    svg {
      height: 1em;
      color: var(--red);
    }

    span {
      color: var(--white);
    }

    &:hover {
      span {
        text-decoration: underline;
      }
    }
  }

  .container {
    padding-top: var(--navbar-safest-area);
    padding-inline: calc(var(--illustration-width) / 2);
  }

  &-list {
    font-size: var(--text-lg);
    font-family: var(--font-headline);
    text-transform: uppercase;
    line-height: 1.25;
    text-align: center;

    .artist {
      font-size: .75em;
      color: var(--white);
      font-family: var(--font-mono);
      opacity: 0;
      color: var(--white);
      text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;

      span {
        transition: .25s ease;
      }

      &:not(:last-child)::after {
        content: '';
        display: inline-block;
        width: .25em;
        height: .25em;
        border-radius: .1em;
        border: 2px solid var(--black);
        transition: .25s ease;
        margin-inline: .5em;
        background-color: var(--white);
        transform: translateY(-100%);
      }
    }
  }

  &-info {
    display: flex;
    font-family: var(--font-heavy);
    gap: var(--site-padding);
    font-weight: bold;
    justify-content: center;
    font-size: var(--text-md);
    margin-top: var(--spacer-6);
    text-align: center;
    line-height: 1;
  }

  &-dates {
    max-width: 15ch;
    opacity: 0;
  }

  &-location {
    opacity: 0;

    span {
      display: block;
      color: var(--black);
    }
  }

  .grain {
    content: '';
    position: absolute;
    inset: 0;
    filter: contrast(170%) brightness(.8);
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    background-attachment: fixed;
    opacity: .5;
  }
}

.artist-card {
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

    :deep(img) {
      aspect-ratio: 1;
      filter: grayscale(1) brightness(1.25);
    }
  }
}

.dim-on-hover {
  transition: .25s ease;
}

@include media('>=md') {
  .hovering {
    .artist:not(.hovering) span,
    .artist::after,
    .dim-on-hover {
      opacity: .1;
    }
  }
}

@include media('>xxl') {
  .home-artists-list {
    line-height: 1.1;

    .artist {
      font-size: 1.4em;
    }
  }
}

@include media('<md') {
  .home-artists {
    background-position: left;
    background-attachment: scroll;

    &::after,
    &::before {
      display: none;
    }

    &-list {
      display: block;
      font-size: 1.25rem;
      line-height: 1;

      .artist:not(:last-child)::after {
        width: .5em;
        height: .5em;
        transform: translateY(-25%);
      }
    }

    &-info {
      font-size: var(--text-sm);
    }
  }
}
</style>