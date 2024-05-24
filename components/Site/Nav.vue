<script setup>
/* Load nav items */
const settings = await useSettings()
const localePath = useLocalePath()
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 100)
</script>

<template>
  <nav :class="['nav', { scrolled }]">
    <NuxtLink :to="localePath('/')" class="nav-logo">
      <SiteLogo />
    </NuxtLink>
    <SiteMenu
      class="nav-menu hidden lg:flex"
      :items="settings.data.story.content.nav"
      :scrolled="scrolled"
    />
    <SiteLanguage class="nav-langs hidden lg:flex" />
    <SiteMobileMenu
      class="nav-mobile lg:hidden ms-auto"
      :items="settings.data.story.content.nav"
      :socials="settings.data.story.content.social_networks"
    />
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  padding: var(--spacer-4) var(--site-padding);
  gap: var(--site-padding);
  --nav-height: 5.75vw;
  font-size: var(--nav-height);
  transition: .25s ease;

  &-logo {
    position: relative;
    z-index: 10000;
    color: var(--white);

    svg {
      display: block;
      height: 1em;
      width: auto;
    }
  }

  &-langs {
    align-self: flex-start;
    margin-inline-start: auto;
    font-size: var(--text-base);
  }

  &.scrolled {
    background: var(--black);
    --nav-height: 2.5rem;
  }
}

@include media('<lg') {
  .nav {
    --nav-height: 2rem;
    height: 4rem;

    &.scrolled {
      --nav-height: 2rem;
    }
  }
}
</style>