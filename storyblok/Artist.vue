<script setup>
const props = defineProps({ blok: Object })
const { t } = useI18n()

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
</script>

<template>
  <div v-editable="blok" class="container padded navbar-safest-area">
    <ul class="divide-y [&>li]:py-5">
      <li v-if="blok.name">
        <strong>Nom: </strong>
        <div>{{ blok.name }}</div>
      </li>
      <li v-if="blok.description">
        <strong>Description: </strong>
        <UtilsRichText :content="blok.description" />
      </li>
      <li v-if="blok.picture.filename">
        <strong>Picture: </strong>
        <img :src="blok.picture.filename" width="300">
      </li>
      <li v-if="blok.youtube_id">
        <strong>Youtube Video: </strong>
        <iframe
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${blok.youtube_id}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </li>
      <li v-if="blok.vimeo_id">
        <strong>Vimeo Video: </strong>
        <div>{{ blok.vimeo_id }}</div>
      </li>
      <li v-if="socials.length > 0">
        <strong>Socials: </strong>
        <SiteSocials :socials="socials" />
      </li>
    </ul>
  </div>
</template>
