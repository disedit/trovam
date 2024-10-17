<script setup>
const props = defineProps({ blok: Object })
const { t } = useI18n()
const { shortDate, time } = useDate()
const localePath = useLocalePath()

const socials = computed(() => {
  const profiles = []
  const { website, spotify, instagram, tiktok, twitter, facebook, youtube, soundcloud, bandcamp } = props.blok
  if (website) profiles.push({ label: t('assist.website'), link: website, icon: 'website' })
  if (spotify) profiles.push({ label: 'Spotify', link: spotify, icon: 'spotify' })
  if (instagram) profiles.push({ label: 'Instagram', link: twitter, icon: 'instagram' })
  if (tiktok) profiles.push({ label: 'TikTok', link: tiktok, icon: 'tiktok' })
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
  const imgUrl = img(props.blok.background.filename || props.blok.picture.filename, { width: 1500 })
  return { backgroundImage: `url('${imgUrl}')` }
})

const showArrow = ref(false)
const showTicketsArrow = ref(false)
const { randomInt } = useUtils()
const colors = ['yellow', 'green', 'pink', 'blue']
const artistColor = computed(() => colors[randomInt(0, colors.length)])
const artistShape = computed(() => `Artists${randomInt(1, 12)}`)
const cardColor = computed(() => getSecondaryColor())

const getSecondaryColor = () => {
  const randomColor = colors[randomInt(0, colors.length)]
  if (randomColor === artistColor.value) return getSecondaryColor()
  return randomColor
}
</script>

<template>
  <article v-editable="blok" :class="['artist', `color-${artistColor}`]">
    <div class="background z-1">
      <div class="background-holder">
        <div class="page-background grayscale" :style="backgroundStyle" />
      </div>
    </div>
    <div class="container padded relative navbar-safest-area z-10 -mt-[100vh]">
      <header class="artist-header">
        <NuxtLink :to="localePath('/2024/artistes')" class="artist-back" @mouseenter="showArrow = true" @mouseleave="showArrow = false">
          <Transition name="fade-left" mode="out-in">
            <Icon name="material-symbols:arrow-back" v-if="showArrow" class="arrow" />
            <ShapesShape1 v-else />
          </Transition>
          Stage / {{ $t('artists.title') }}
        </NuxtLink>
        <ShapesArtists :shape="artistShape" class="artist-shape hidden lg:block" />
        <h1 :class="['artist-name font-heavy', { short: blok.name.length < 10, tiny: blok.name.length < 6, medium: blok.name.length < 15 }]">
          <span class="compensate">{{ blok.name }}</span>
        </h1>
      </header>
      <section :class="['artist-info polaroid focus-black', `color-${cardColor}`]">
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
        <SiteSocials :socials="socials" class="artist-socials" />
      </section>
      <section class="artist-description polaroid">
        <div class="md:sticky top-navbar-plus self-start">
          <NuxtImg
            v-if="blok.picture?.filename"
            :src="blok.picture.filename"
            :alt="`Foto de ${blok.name}`"
            sizes="100vw md:800px"
          />
        </div>
        <div class="artist-text sticky top-navbar-plus self-start">
          <UtilsRichText :content="blok.description" />
        </div>
      </section>
      <section v-if="blok.youtube_id || blok.vimeo_id" class="artist-video polaroid">
        <UtilsYoutube v-if="blok.youtube_id" :video-id="blok.youtube_id" />
        <UtilsVimeo v-else :video-id="blok.vimeo_id" />
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
    font-size: var(--text-4xl);
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
      top: .15em;
    }

    &.medium {
      font-size: 1.25em;
    }

    &.short {
      font-size: 1.75em;
    }

    &.tiny {
      font-size: 2em;
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

    .arrow {
      height: 1.25em;
      width: 1.25em;
    }
  }

  &-description {
    grid-area: description;
    flex-direction: row;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: var(--text-md);

    img {
      width: 100%;
    }
  }

  &-info {
    grid-area: info;
    background-color: var(--color);
    display: flex;
    flex-direction: column;
    gap: var(--card-padding);
    justify-content: space-between;

    .artist-socials {
      --hover-color: var(--white);
      margin-top: 0;
      justify-content: space-between;
    }
  }

  &-socials {
    font-size: 2.5rem;
    flex-wrap: wrap;
    line-height: 1;
    margin-left: -.25em;
    margin-top: var(--card-padding);

    :deep(a) {
      padding: .25em;
      border-radius: 100%;

      &:hover {
        opacity: 1;
        background: var(--hover-color, var(--color));
      }
    }
  }

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
      border: 3px var(--black) solid;
      padding: .5em .5em .4em .5em;
      border-radius: 10rem;
      color: var(--black);
      text-align: center;
      transition: .25s ease;

      &:hover {
        background: var(--white);
      }
    }

    &-tickets {
      display: flex;
      border: 3px var(--black) solid;
      padding: .5em 1.25em;
      border-radius: 10rem;
      color: var(--white);
      justify-content: space-between;
      align-items: center;
      gap: var(--spacer-2);
      background-color: var(--black);
      font-weight: bold;
      transition: .25s ease;

      &:hover {
        background: var(--white);
        color: var(--black);
        border-color: var(--white);
      }
    }

    &-info {
      &:deep(h3) {
        border-bottom: 2px var(--black) solid;
        margin-bottom: .5em;
      }
    }
  }

  &-video {
    grid-area: video;
  }
}

.container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--site-padding);
  grid-template-areas:
    "header header"
    "description info"
    "video video";
}

@include media('>lg') {
  .artist {
    &-description,
    &-info,
    &-video {
      --card-padding: var(--spacer-6);
    }

    &-text {
      line-height: 1.65;
    }
  }
}

@include media('<lg') {
  .artist {
    .container {
      grid-template-columns: 1fr;
      grid-template-areas:
        "header"
        "info"
        "description"
        "video";
    }

    &-header {
      grid-template-columns: 1fr;
      grid-template-areas:
        "back"
        "name";
      font-size: var(--text-2xl);
    }

    &-name {
      text-align: left;

      &.medium {
        font-size: 1.25em;
      }

      &.short {
        font-size: 1.4em;
      }

      &.tiny {
        font-size: 2em;
      }
    }
  }
}

@include media('<md') {
  .artist {

    &-description {
      grid-template-columns: 1fr;
    }

    &-socials {
      font-size: 1.75rem;
    }
  }
}
</style>