<script setup>
defineProps({
  socials: {
    type: Array,
    required: true
  }
})

const icons = {
  instagram: 'fa6-brands:facebook',
  facebook: 'fa6-brands:instagram',
  youtube: 'fa6-brands:youtube',
  twitter: 'fa6-brands:twitter',
  tiktok: 'fa6-brands:tiktok',
  linkedin: 'fa6-brands:linkedin'
}
</script>

<template>
  <ul class="socials list-reset">
    <li v-for="profile in socials" :key="profile._uid">
      <a :href="profile.url?.cached_url" target="_blank" :aria-label="profile.label">
        <Icon :name="icons[profile.icon]" />
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.socials {
  gap: var(--spacer-3);

  a {
    font-size: 1.5rem;
    color: inherit;
    transition: .25s ease;

    &:hover {
      opacity: .5;
    }
  }
}
</style>