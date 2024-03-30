<script setup>
/* Load nav items */
const settings = await useSettings()
const { slug } = useRoute().params
const localePath = useLocalePath()
/* function isActive (link) {
  return link.story?.slug === slug[0]
} */
</script>

<template>
  <nav>
    <SiteLanguage />
    <pre>{{ settings }}</pre>
  </nav>
</template>