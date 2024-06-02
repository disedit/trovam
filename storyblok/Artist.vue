<script setup>
const props = defineProps({ blok: Object })
const { t } = useI18n()
const localePath = useLocalePath()

const socials = computed(() => {
  const profiles = []
  const { website, spotify, instagram, twitter, facebook, youtube, soundcloud, bandcamp } = props.blok
  if (website) profiles.push({ label: t('assist.website'), link: website, icon: 'website' })
  if (spotify) profiles.push({ label: 'Spotify', link: spotify, icon: 'spotify' })
  if (instagram) profiles.push({ label: 'Instagram', link: twitter, icon: 'instagram' })
  if (facebook) profiles.push({ label: 'Facebook', link: facebook, icon: 'facebook' })
  if (youtube) profiles.push({ label: 'Youtube', link: youtube, icon: 'youtube' })
  if (soundcloud) profiles.push({ label: 'Soundcloud', link: soundcloud, icon: 'soundcloud' })
  if (bandcamp) profiles.push({ label: 'Bandcamp', link: bandcamp, icon: 'bandcamp' })
  return profiles
})

/* Background */
const img = useImage()
const backgroundStyle = computed(() => {
  if (!props.blok.picture?.filename) return false
  const imgUrl = img(props.blok.picture.filename, { width: 1500 })
  return { backgroundImage: `url('${imgUrl}')` }
})

const showArrow = ref(false)
const { randomInt } = useUtils()
const colors = ['yellow', 'green', 'pink', 'blue']
const artistColor = computed(() => colors[randomInt(0, colors.length - 1)])
const artistShape = computed(() => `Artists${randomInt(1, 12)}`)
</script>

<template>
  <article v-editable="blok" :class="['artist', `color-${artistColor}`]">
    <div class="background z-1">
      <div class="background-holder">
        <div class="artist-background" :style="backgroundStyle" />
      </div>
    </div>
    <div class="container padded relative navbar-safest-area z-10 -mt-[100vh]">
      <header class="artist-header">
        <NuxtLink :to="localePath('/2024/artistes')" class="artist-back" @mouseenter="showArrow = true" @mouseleave="showArrow = false">
          <Transition name="fade-left" mode="out-in">
            <Icon name="material-symbols:arrow-back" v-if="showArrow" />
            <ShapesShape1 v-else />
          </Transition>
          Live / {{ $t('artists.title') }}
        </NuxtLink>
        <ShapesArtists :shape="artistShape" class="artist-shape" />
        <h1 class="artist-name font-heavy">
          <span class="compensate">{{ blok.name }}</span>
        </h1>
      </header>
      <section class="artist-info">
        <SiteSocials :socials="socials" />
        Concert
      </section>
      <section class="artist-description polaroid">
        <div class="sticky top-navbar self-start">
          <NuxtImg
            v-if="blok.picture?.filename"
            :src="blok.picture.filename"
            :alt="`Foto de ${blok.name}`"
          />
        </div>
        <div class="sticky top-navbar self-start">
          <UtilsRichText :content="blok.description" />
          ds
        </div>
      </section>
      <section v-if="blok.youtube_id || blok.vimeo_id" class="artist-video polaroid">
        <iframe
          v-if="blok.youtube_id"
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${blok.youtube_id}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
        <iframe
          v-else-if="blok.vimeo_id"
          :src="`https://player.vimeo.com/video/${blok.vimeo_id}`"
          width="640"
          height="360"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        />
      </section>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.artist {
  &-header {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-areas:
      "back name"
      "shape name";
    font-size: var(--text-5xl);
    margin-top: calc(4rem + 10vh);
    grid-area: header;
    gap: var(--site-padding);
  }

  &-shape {
    height: .85em;
    color: var(--color);
    grid-area: shape;
    align-self: end;
  }

  &-name {
    line-height: .9;
    text-align: right;
    grid-area: name;
    align-self: end;

    .compensate {
      top: .2em;
    }
  }

  &-back {
    position: relative;
    grid-area: back;
    font-size: var(--text-md);
    font-weight: bold;
    color: var(--white);
    padding-left: 1.5em;

    &:hover {
      text-decoration: underline;
      text-underline-offset: .25em;
      text-decoration-thickness: 1px;
    }

    svg {
      display: block;
      position: absolute;
      top: .1em;
      left: 0;
      height: 1em;
      color: var(--red);
    }
  }

  &-description {
    grid-area: description;
    flex-direction: row;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: var(--text-lg);

    img {
      width: 100%;
    }
  }

  &-info {
    grid-area: info;
  }

  &-video {
    grid-area: video;
    max-width: 1100px;
    margin-inline-start: auto;
    width: 100%;

    iframe {
      aspect-ratio: 16 / 9;
      width: 100%;
      height: 100%;
    }
  }
}
.container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--site-padding);
  grid-template-areas:
    "header header"
    "description info"
    "video video";
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

.artist-background {
  position: absolute;
  inset: 0;
  background-position: top;
  background-size: cover;
  z-index: 1;
  z-index: 2;
  filter: grayscale(1) contrast(1) brightness(.5);
}
</style>