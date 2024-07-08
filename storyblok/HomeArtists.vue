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
  starts_with: props.blok.path || `2024/artistes/`,
  sort_by: 'content.name:asc',
  is_startpage: false
}

const filter = props.blok.ordered_artists.length > 0 ? orderedArtists : autopopulate

const { data: artists } = await useAsyncData(
  'artists_home',
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    excluding_fields: 'cta_url,cta_label,website,description,facebook,twitter,instagram,youtube,youtube_id,vimeo_id,spotify,bandcamp,soundcloud',
    ...filter
  })
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
</script>

<template>
  <section
    v-editable="blok"
    :class="['home-artists', { hovering: !!hovering }]"
    :style="backgroundStyle"
    :aria-labelledby="`title-${blok._uid}`"
  >
    <div class="container padded relative z-10">
      <NuxtLink :to="`/${blok.path}`" class="dim-on-hover">
        <h2 :id="`title-${blok._uid}`" class="home-artists-title">
          <ShapesShape1 />
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
              'artist relative',
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
        <span v-for="artist in artists?.data?.stories" :key="artist.slug" class="artist">
          {{ artist.content.name }}
        </span>
      </NuxtLink>
      <div class="hidden md:block">
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
  </section>
</template>

<style lang="scss" scoped>
.home-artists {
  position: relative;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  min-height: 100svh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: clip;

  &-title {
    display: flex;
    font-weight: bold;
    font-size: var(--text-base);
    align-items: center;
    gap: .25em;
    margin-bottom: var(--spacer-4);

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
  }

  &-list {
    font-size: var(--text-xl);
    font-family: var(--font-headline);
    text-transform: uppercase;
    line-height: 1.25;
    text-align: justify;

    .artist {
      font-size: 1.05em;
      color: var(--white);

      span {
        transition: .25s ease;
      }

      &:not(:last-child)::after {
        content: ' / ';
        transition: .25s ease;
      }
    }
  }

  &-info {
    display: flex;
    font-family: var(--font-heavy);
    gap: var(--site-padding);
    font-weight: bold;
    font-size: var(--text-md);
    margin-top: var(--spacer-6);
    line-height: 1;
  }

  &-dates {
    max-width: 15ch;
  }

  &-location {
    span {
      display: block;
      color: var(--blue);
    }
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
    filter: saturate(1.15);

    :deep(img) {
      aspect-ratio: 1;
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

@include media('<md') {
  .home-artists {
    background-position: left;

    &-list {
      display: block;
      font-size: var(--text-base);
    }

    &-info {
      font-size: var(--text-sm);
    }
  }
}
</style>