<script setup>
/* Load nav items */
const settings = await useSettings()
const localePath = useLocalePath()
const { internalLink } = useLinks()
</script>

<template>
  <nav>
    <NuxtLink :to="localePath('/')">
      <SiteLogo />
    </NuxtLink>

    <ul>
      <li v-for="item in settings.data.story.content.nav" :key="item._uid">
        <NuxtLink v-if="item.component === 'Submenu'" :to="internalLink(item.index?.story?.full_slug)">
          {{ item.label }}
        </NuxtLink>
        <NuxtLink v-else :to="internalLink(item.link?.story?.full_slug)">
          {{ item.label }}
        </NuxtLink>

        <ul v-if="item.items?.length > 0">
          <li v-for="subitem in item.items" :key="subitem._uid">
            <NuxtLink :to="internalLink(subitem.link?.story?.full_slug)">
              {{ subitem.label }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>

    <SiteLanguage />
  </nav>
</template>