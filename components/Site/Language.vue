<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <ul class="language" aria-label="Idioma / Language">
    <li v-for="lang in locales" :key="lang.code">
      <NuxtLink
        :to="switchLocalePath(lang.code)"
        :title="lang.name"
        :class="{ 'active': locale === lang.code }"
      >
        {{ lang.name }}
      </NuxtLink>
    </li>
  </ul>
</template>
