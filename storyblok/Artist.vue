<script setup>
const props = defineProps({ blok: Object })
const { t } = useI18n()
const { tr } = useTranslated()
const localePath = useLocalePath()

const socials = computed(() => {
  const profiles = []
  const { website, spotify, instagram, twitter, tiktok, facebook, youtube, soundcloud, bandcamp } = props.blok
  if (website) profiles.push({ label: t('assist.website'), link: website, icon: 'website' })
  if (spotify) profiles.push({ label: 'Spotify', link: spotify, icon: 'spotify' })
  if (instagram) profiles.push({ label: 'Instagram', link: instagram, icon: 'instagram' })
  if (twitter) profiles.push({ label: 'X', link: twitter, icon: 'twitter' })
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
  return { backgroundImage: `url('${imgUrl}/m/1600x0')`, backgroundPosition: 'center', backgroundSize: 'cover' }
})

// Get year
const { slug } = useRoute().params
const year = slug[0]
</script>

<template>
  <article v-editable="blok" class="artist">
    <div class="background background-red z-1">
      <div class="background-holder">
        <div class="page-background with-overlay" :style="backgroundStyle" />
      </div>
    </div>
    <div class="container padded relative navbar-safest-area z-10 -mt-[100vh]">
      <header class="artist-header">
        <NuxtLink :to="localePath(`/${year}/artistes`)" class="artist-back">
          Stage / {{ $t('artists.title') }} {{ year }}
        </NuxtLink>
        <div class="artist-shape hidden lg:block" />
        <h1 v-if="blok.name" :class="['artist-name font-mono uppercase', { short: blok.name.length < 10, tiny: blok.name.length < 6, medium: blok.name.length < 15 }]">
          <span class="compensate">{{ blok.name }}</span>
        </h1>
      </header>
      <section class="artist-info polaroid focus-yellow">
        <LegosArtistConcert v-if="blok.concert_date" :blok="blok" />
        <template v-if="blok.extra_concerts">
          <LegosArtistConcert v-for="extra_concert in blok.extra_concerts" :blok="extra_concert.content" :key="extra_concert.uuid" />
        </template>
        <SiteSocials :socials="socials" class="artist-socials" />
      </section>
      <section class="artist-description polaroid">
        <div class="md:sticky top-navbar-plus self-start">
          <NuxtImg
            v-if="blok.picture?.filename"
            :src="blok.picture.filename + '/m/1600x0'"
            :alt="`Foto de ${blok.name}`"
            sizes="100vw md:800px"
          />
        </div>
        <div class="artist-text sticky top-navbar-plus self-start">
          <UtilsRichText :content="tr(blok, 'description')" />
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
    grid-template-columns: 350px 1fr;
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
      font-size: 1.5em;
    }

    &.short {
      font-size: 2em;
    }

    &.tiny {
      font-size: 2.25em;
    }
  }

  &-back {
    position: relative;
    grid-area: back;
    font-size: var(--text-md);
    font-weight: bold;
    color: var(--white);

    &:hover {
      text-decoration: underline;
      text-underline-offset: .25em;
      text-decoration-thickness: 1px;
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
    background-color: var(--black);
    color: var(--white);
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
      height: 1.75em;
      width: 1.75em;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        opacity: 1;
        background: var(--hover-color, var(--white));
        color: var(--hover-text-color, var(--red));
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
      font-size: 1.75em;

      &.medium {
        font-size: 2.25em;
      }

      &.short {
        font-size: 2.75em;
      }

      &.tiny {
        font-size: 3.25em;
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